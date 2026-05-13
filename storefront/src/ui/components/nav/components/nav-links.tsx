import Link from "next/link";
import { NavLink } from "./nav-link";
import { executePublicGraphQL } from "@/lib/graphql";
import { MenuGetBySlugDocument } from "@/gql/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";

export const NavLinks = async ({ channel }: { channel: string }) => {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.navigation);

	const result = await executePublicGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "navbar", channel },
		revalidate: 60 * 60, // 1 hour
	});

	if (!result.ok) {
		// During build, if the API is unreachable, render minimal nav.
		// The page will re-fetch when a user visits.
		console.warn(`[NavLinks] Failed to fetch navigation for ${channel}:`, result.error.message);
		return (
			<>
				{/* <NavLink href="/products">Sve</NavLink> */}
				<NavLink href="/pages/o-nama">O nama</NavLink>
				<NavLink href="/pages/faq">FAQ</NavLink>
			</>
		);
	}

	return (
		<>
			<NavLink href="/pages/o-nama">O nama</NavLink>
			<NavLink href="/pages/faq">FAQ</NavLink>
		</>
	);
};
