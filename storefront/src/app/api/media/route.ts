import { type NextRequest, NextResponse } from "next/server";

const SALEOR_ORIGIN = new URL(process.env.NEXT_PUBLIC_SALEOR_API_URL!).origin;

export async function GET(request: NextRequest) {
	const url = request.nextUrl.searchParams.get("url");
	if (!url || !url.startsWith(SALEOR_ORIGIN)) {
		return new NextResponse("Forbidden", { status: 403 });
	}
	const res = await fetch(url, { next: { revalidate: 86400 } });
	if (!res.ok) {
		return new NextResponse("Not found", { status: 404 });
	}
	const body = await res.arrayBuffer();
	return new NextResponse(body, {
		headers: {
			"Content-Type": res.headers.get("Content-Type") ?? "image/webp",
			"Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
		},
	});
}
