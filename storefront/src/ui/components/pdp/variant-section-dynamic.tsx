import { revalidatePath } from "next/cache";

import { formatMoney, formatMoneyRange } from "@/lib/utils";
import { getDiscountInfo } from "@/lib/pricing";
import { CheckoutAddLineDocument, type ProductDetailsQuery } from "@/gql/graphql";
import { executeAuthenticatedGraphQL } from "@/lib/graphql";
import * as Checkout from "@/lib/checkout";

import { AddToCart } from "./add-to-cart";
import { VariantSelectionSection } from "./variant-selection";
import { StickyBar } from "./sticky-bar";
import { Badge } from "@/ui/components/ui/badge";
import { MaterialQuantityInput } from "./material-quantity-input";

const MATERIAL_CATEGORY_SLUG = "materijali";
const METER_MULTIPLIER = 10;

type Product = NonNullable<ProductDetailsQuery["product"]>;

interface VariantSectionDynamicProps {
	product: Product;
	channel: string;
	searchParams: Promise<{ variant?: string }>;
}

/**
 * Dynamic variant section for PDP.
 *
 * With Cache Components enabled, this component streams at request time
 * because it accesses searchParams (runtime data). The product data is
 * already cached in the static shell - this just adds the interactive parts.
 */
export async function VariantSectionDynamic({ product, channel, searchParams }: VariantSectionDynamicProps) {
	const { variant: variantParam } = await searchParams;
	const variants = product.variants || [];

	// Auto-select variant: use URL param, or auto-select if only one variant exists
	const selectedVariantID = variantParam || (variants.length === 1 ? variants[0].id : undefined);
	const selectedVariant = variants.find(({ id }) => id === selectedVariantID);

	// Check availability
	const isAvailable = variants.some((variant) => variant.quantityAvailable);

	// Determine add-to-cart button state
	const isAddToCartDisabled = !selectedVariantID || !selectedVariant?.quantityAvailable;
	const disabledReason = !selectedVariantID
		? ("no-selection" as const)
		: !selectedVariant?.quantityAvailable
			? ("out-of-stock" as const)
			: undefined;

	const isMaterial = product.category?.slug === MATERIAL_CATEGORY_SLUG;

	// Format prices — for material products Saleor stores price-per-0.1m unit,
	// so multiply by METER_MULTIPLIER (10) to display the customer-facing price-per-metre.
	const priceGross = selectedVariant?.pricing?.price?.gross;
	const price = priceGross
		? priceGross.amount === 0
			? "FREE"
			: isMaterial
				? formatMoney(priceGross.amount * METER_MULTIPLIER, priceGross.currency) + " / m"
				: formatMoney(priceGross.amount, priceGross.currency)
		: formatMoneyRange({
				start: product.pricing?.priceRange?.start?.gross,
				stop: product.pricing?.priceRange?.stop?.gross,
			}) || "";

	// Calculate discount/sale information
	const currentPrice = priceGross?.amount;
	const undiscountedPrice = selectedVariant?.pricing?.priceUndiscounted?.gross?.amount;
	const { isOnSale, discountPercent } = getDiscountInfo(currentPrice, undiscountedPrice);

	const compareAtPrice =
		isOnSale && selectedVariant?.pricing?.priceUndiscounted?.gross
			? isMaterial
				? formatMoney(
						selectedVariant.pricing.priceUndiscounted.gross.amount * METER_MULTIPLIER,
						selectedVariant.pricing.priceUndiscounted.gross.currency,
					) + " / m"
				: formatMoney(
						selectedVariant.pricing.priceUndiscounted.gross.amount,
						selectedVariant.pricing.priceUndiscounted.gross.currency,
					)
			: null;

	// Server action for adding to cart
	async function addToCart(formData: FormData) {
		"use server";

		if (!selectedVariantID) {
			return;
		}

		// For material products (sold by metre): form sends integer units (0.1 m each).
		// For all others: quantity is always 1.
		const rawQty = formData.get("quantity");
		const quantity = isMaterial && rawQty
			? Math.max(1, parseInt(rawQty as string, 10))
			: 1;

		try {
			const checkout = await Checkout.findOrCreate({
				checkoutId: await Checkout.getIdFromCookies(channel),
				channel: channel,
			});

			if (!checkout) {
				console.error("Add to cart: Failed to create checkout");
				return;
			}

			await Checkout.saveIdToCookie(channel, checkout.id);

			const addResult = await executeAuthenticatedGraphQL(CheckoutAddLineDocument, {
				variables: {
					id: checkout.id,
					productVariantId: decodeURIComponent(selectedVariantID),
					quantity,
				},
				cache: "no-cache",
			});

			if (!addResult.ok) {
				console.error("[addToCart] GraphQL/HTTP error:", addResult.error.message);
				return;
			}

			// Check Saleor domain errors (stock, availability, etc.)
			const mutationErrors = addResult.data.checkoutLinesAdd?.errors;
			if (mutationErrors && mutationErrors.length > 0) {
				console.error("[addToCart] Saleor mutation errors:", JSON.stringify(mutationErrors));
				return;
			}

			revalidatePath("/cart");
		} catch (error) {
			console.error("Add to cart failed:", error);
		}
	}

	return (
		<>
			{/* Category + Sale/Stock badges row - order:1 so it appears ABOVE the h1 */}
			<div className="order-1 flex items-center gap-2">
				{product.category && <span className="text-sm text-muted-foreground">{product.category.name}</span>}
				{isOnSale && (
					<Badge variant="destructive" className="text-xs">
						Sale
					</Badge>
				)}
				{!isAvailable && (
					<Badge variant="secondary" className="text-xs">
						Out of stock
					</Badge>
				)}
			</div>

			{/* Rest of variant section - order:3 so it appears BELOW the h1 */}
			<form action={addToCart} className="order-3 mt-4 space-y-6">
				{/* Variant Selectors */}
				<VariantSelectionSection
					variants={variants}
					selectedVariantId={selectedVariantID}
					productSlug={product.slug}
					channel={channel}
				/>

				{/* Metre quantity input – only for Materijali category */}
				{isMaterial && <MaterialQuantityInput />}

				{/* Add to Cart */}
				<AddToCart
					price={price}
					compareAtPrice={compareAtPrice}
					discountPercent={discountPercent}
					disabled={isAddToCartDisabled}
					disabledReason={disabledReason}
				/>

				{/* Sticky Add to Cart Bar (Mobile) */}
				<StickyBar productName={product.name} price={price} show={!isAddToCartDisabled} />
			</form>
		</>
	);
}

/**
 * Skeleton fallback for variant section.
 *
 * Uses delayed visibility (300ms) to prevent flash on fast loads.
 * Part of the static shell - shows while variant data streams in.
 */
export function VariantSectionSkeleton() {
	return (
		<>
			{/* Category skeleton - order:1, delayed visibility */}
			<div className="order-1 h-4 w-20 animate-pulse animate-skeleton-delayed rounded bg-muted opacity-0" />

			{/* Variant section skeleton - order:3, delayed visibility */}
			<div className="order-3 mt-4 animate-pulse animate-skeleton-delayed space-y-6 opacity-0">
				{/* Variant selector skeleton */}
				<div className="space-y-4">
					<div className="h-4 w-16 rounded bg-muted" />
					<div className="flex gap-2">
						<div className="h-10 w-16 rounded bg-muted" />
						<div className="h-10 w-16 rounded bg-muted" />
						<div className="h-10 w-16 rounded bg-muted" />
					</div>
				</div>

				{/* Price skeleton */}
				<div className="h-8 w-24 rounded bg-muted" />

				{/* Add to cart button skeleton */}
				<div className="h-12 w-full rounded bg-muted" />
			</div>
		</>
	);
}
