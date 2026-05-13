/**
 * Locale settings for display formatting. Currency comes from Saleor channels, not here.
 */

export const localeConfig = {
	/** Locale for Intl APIs (number/date formatting) - BCP 47 format */
	default: "sr-Latn-RS",

	/** Language code for Saleor API - controls translated content */
	graphqlLanguageCode: "EN_US" as const,

	/** HTML lang attribute */
	htmlLang: "sr",

	/** Open Graph locale */
	ogLocale: "sr_RS",

	/** Available locales (for future i18n) */
	available: ["sr-Latn-RS"] as const,

	/**
	 * Fallback currency - ONLY used when API returns null (shouldn't happen).
	 * Real currency comes from the channel via Saleor API.
	 */
	fallbackCurrency: "RSD",

	/**
	 * Override the currency symbol for display regardless of what the Saleor
	 * channel returns. Useful when channel is still set to USD but prices are
	 * entered in local currency values. Set to null to use the channel currency.
	 */
	displayCurrency: "RSD",
};

/**
 * Format a price with the configured locale.
 */
export function formatPrice(amount: number, currency: string): string {
	return new Intl.NumberFormat(localeConfig.default, {
		style: "currency",
		currency: localeConfig.displayCurrency ?? currency,
	}).format(amount);
}

/**
 * Format a date with the configured locale.
 */
export function formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string {
	return new Intl.DateTimeFormat(localeConfig.default, {
		dateStyle: "medium",
		...options,
	}).format(date);
}

/**
 * Format a number with the configured locale.
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
	return new Intl.NumberFormat(localeConfig.default, options).format(value);
}
