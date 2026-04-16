import Link from "next/link";
import { LinkWithChannel } from "../atoms/link-with-channel";
import { ChannelSelect } from "./channel-select";
import { ChannelsListDocument, MenuGetBySlugDocument } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { CopyrightText } from "./copyright-text";
import { Logo } from "./shared/logo";

// Default footer links when no CMS data is available
const defaultFooterLinks = {
	shop: [
		{ label: "Sve kategorije", href: "/products" },
		{ label: "Zavese i dekoracija", href: "/categories/zavese-i-dekoracija" },
		{ label: "Držači za saksije", href: "/categories/drzaci-za-saksije" },
		{ label: "Nameštaj i lampe", href: "/categories/namestaj-i-lampe" },
		{ label: "Odeća i aksesoari", href: "/categories/odeca-i-aksesoari" },
	],
	info: [
		{ label: "O nama", href: "/pages/o-nama" },
		{ label: "Kontakt", href: "/pages/kontakt" },
		{ label: "FAQ", href: "/pages/faq" },
	],
};

/** Cached channels list - rarely changes */
async function getChannels() {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.channels);

	if (!process.env.SALEOR_APP_TOKEN) {
		return null;
	}

	const result = await executePublicGraphQL(ChannelsListDocument, {
		headers: {
			Authorization: `Bearer ${process.env.SALEOR_APP_TOKEN}`,
		},
	});

	return result.ok ? result.data : null;
}

/** Cached footer menu */
async function getFooterMenu(channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.footerMenu);

	const result = await executePublicGraphQL(MenuGetBySlugDocument, {
		variables: { slug: "footer", channel },
		revalidate: 60 * 60 * 24,
	});

	return result.ok ? result.data : null;
}

export async function Footer({ channel }: { channel: string }) {
	const [footerLinks, channels] = await Promise.all([getFooterMenu(channel), getChannels()]);

	const menuItems = footerLinks?.menu?.items || [];

	return (
		<footer className="bg-[#3d2b1f] text-[#f5efe6]">
			<div className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 sm:pb-12 lg:px-8 lg:py-16">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
					{/* Brand */}
					<div className="col-span-2 md:col-span-1">
						<Link href={`/${channel}`} prefetch={false} className="mb-4 inline-block">
							<Logo inverted />
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-[#c4a898]">
							Macramé dekoracije i odeća rađene s ljubavlju i po tvojoj meri. Svaki čvor priča priču.
						</p>
						{/* Social icons */}
						<div className="mt-6 flex items-center gap-4">
							<Link
								href="https://www.instagram.com/mac.mac.rame"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-[#c4a898] transition-colors hover:text-[#f5efe6]"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
									<circle cx="12" cy="12" r="4"/>
									<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
								</svg>
							</Link>
							<Link
								href="https://www.facebook.com/profile.php?id=61558148182063"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Facebook"
								className="text-[#c4a898] transition-colors hover:text-[#f5efe6]"
							>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
								</svg>
							</Link>
						</div>
					</div>

					{/* Dynamic menu items from Saleor CMS */}
					{menuItems.map((item) => (
						<div key={item.id}>
							<h4 className="mb-4 text-sm font-medium text-[#e8ddd4]">{item.name}</h4>
							<ul className="space-y-3">
								{item.children?.map((child) => {
									if (child.category) {
										return (
											<li key={child.id}>
												<LinkWithChannel
													href={`/categories/${child.category.slug}`}
													prefetch={false}
													className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
												>
													{child.category.name}
												</LinkWithChannel>
											</li>
										);
									}
									if (child.collection) {
										return (
											<li key={child.id}>
												<LinkWithChannel
													href={`/collections/${child.collection.slug}`}
													prefetch={false}
													className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
												>
													{child.collection.name}
												</LinkWithChannel>
											</li>
										);
									}
									if (child.page) {
										return (
											<li key={child.id}>
												<LinkWithChannel
													href={`/pages/${child.page.slug}`}
													prefetch={false}
													className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
												>
													{child.page.title}
												</LinkWithChannel>
											</li>
										);
									}
									if (child.url) {
										return (
											<li key={child.id}>
												<Link
													href={child.url}
													prefetch={false}
													className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
												>
													{child.name}
												</Link>
											</li>
										);
									}
									return null;
								})}
							</ul>
						</div>
					))}

					{/* Static fallback links (when no CMS data) */}
					{menuItems.length === 0 && (
						<>
							<div>
								<h4 className="mb-4 text-sm font-medium text-[#e8ddd4]">Prodavnica</h4>
								<ul className="space-y-3">
									{defaultFooterLinks.shop.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												prefetch={false}
												className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div>
								<h4 className="mb-4 text-sm font-medium text-[#e8ddd4]">Informacije</h4>
								<ul className="space-y-3">
									{defaultFooterLinks.info.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												prefetch={false}
												className="text-sm text-[#c4a898] transition-colors hover:text-[#f5efe6]"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</>
					)}
				</div>

				{/* Channel selector */}
				{channels?.channels && (
					<div className="mt-8 text-[#c4a898]">
						<label className="flex items-center gap-2 text-sm">
							<span>Valuta:</span>
							<ChannelSelect channels={channels.channels} />
						</label>
					</div>
				)}

				{/* Bottom bar */}
				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#5c3d2e] pt-8 sm:flex-row">
					<p className="text-xs text-[#9a7a6a]">
						<CopyrightText />
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="/pages/politika-privatnosti"
							prefetch={false}
							className="text-xs text-[#9a7a6a] transition-colors hover:text-[#f5efe6]"
						>
							Politika privatnosti
						</Link>
						<Link
							href="/pages/uslovi-koriscenja"
							prefetch={false}
							className="text-xs text-[#9a7a6a] transition-colors hover:text-[#f5efe6]"
						>
							Uslovi korišćenja
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
