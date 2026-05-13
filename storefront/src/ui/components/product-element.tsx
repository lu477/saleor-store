import { LinkWithChannel } from "../atoms/link-with-channel";
import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";
import { proxySaleorUrl } from "@/lib/saleor-image";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
	return (
		<li data-testid="ProductElement">
			<LinkWithChannel href={`/products/${product.slug}`} key={product.id} prefetch={false}>
				<div>
					{product?.thumbnail?.url && (
						<div className="aspect-square overflow-hidden bg-secondary">
							<img
								src={proxySaleorUrl(product.thumbnail.url)}
								alt={product.thumbnail.alt ?? ""}
								className="h-full w-full object-cover object-center"
								loading={priority ? "eager" : loading}
								fetchPriority={priority ? "high" : "auto"}
							/>
						</div>
					)}
					<div className="mt-2 flex justify-between">
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900">{product.name}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{product.category?.name}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
							{formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})}
						</p>
					</div>
				</div>
			</LinkWithChannel>
		</li>
	);
}
