/**
 * Brand Configuration
 *
 * Centralized branding settings for the storefront.
 * Update these values when customizing for a new store.
 *
 * @example
 * ```tsx
 * import { brandConfig } from "@/config/brand";
 *
 * <title>{brandConfig.siteName}</title>
 * <p>© {new Date().getFullYear()} {brandConfig.copyrightHolder}</p>
 * ```
 */

export const brandConfig = {
	/** Site name used in titles, metadata, and headers */
	siteName: "Mac Macrame",

	/** Legal entity name for copyright notices */
	copyrightHolder: "MacMacrame",

	/** Organization name for structured data (JSON-LD) */
	organizationName: "Mac Macrame",

	/** Default brand name for products without a brand */
	defaultBrand: "Mac Macrame",

	/** Tagline/description for the store */
	tagline: "Svaki čvor priča priču",

	/** Homepage meta description */
	description: "Macramé dekoracije i odeća rađene s ljubavlju i po tvojoj meri!",

	/** Logo aria-label for accessibility */
	logoAriaLabel: "Mac Macrame",

	/** Title template - %s will be replaced with page title */
	titleTemplate: "%s | Mac Macrame",

	/** Social media handles */
	social: {
		/** Twitter/X handle (without @) - set to null to disable */
		twitter: null as string | null,
		/** Instagram handle (without @) - set to null to disable */
		instagram: "mac.mac.rame" as string | null,
		/** Facebook page URL - set to null to disable */
		facebook: "https://www.facebook.com/profile.php?id=61558148182063" as string | null,
	},
} as const;

/**
 * Helper to format page title using brand template.
 */
export function formatPageTitle(title: string): string {
	return brandConfig.titleTemplate.replace("%s", title);
}

/**
 * Get copyright text with specified year.
 * Use CopyrightText component for dynamic year in Server Components.
 */
export function getCopyrightText(year: number = new Date().getFullYear()): string {
	return `© ${year} ${brandConfig.copyrightHolder}. All rights reserved.`;
}
