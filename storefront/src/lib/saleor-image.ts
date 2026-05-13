const SALEOR_ORIGIN =
	typeof process.env.NEXT_PUBLIC_SALEOR_API_URL === "string"
		? new URL(process.env.NEXT_PUBLIC_SALEOR_API_URL).origin
		: null;

/**
 * Routes Saleor media URLs through the local /api/media proxy.
 * This avoids Next.js SSRF protection blocking private-IP fetches,
 * and lets external clients (e.g. ngrok) load images without direct
 * access to the internal Saleor server.
 */
export function proxySaleorUrl(url: string): string {
	if (SALEOR_ORIGIN && url.startsWith(SALEOR_ORIGIN)) {
		return `/api/media?url=${encodeURIComponent(url)}`;
	}
	return url;
}
