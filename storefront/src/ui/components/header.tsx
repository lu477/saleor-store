import { Suspense } from "react";
import Link from "next/link";

import { Logo } from "./logo";
import { NavLinks } from "./nav/components/nav-links";
import { CartNavItem } from "./nav/components/cart-nav-item";
import { UserMenuContainer } from "./nav/components/user-menu/user-menu-container";
import { MobileMenu } from "./nav/components/mobile-menu";
import { SearchBar } from "./nav/components/search-bar";

function SearchBarSkeleton() {
	return <div className="h-10 w-full max-w-md animate-pulse rounded-lg bg-secondary" />;
}

function NavLinksSkeleton() {
	return (
		<>
			<li className="inline-flex">
				<span className="h-4 w-8 animate-pulse rounded bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-4 w-16 animate-pulse rounded bg-muted" />
			</li>
			<li className="inline-flex">
				<span className="h-4 w-12 animate-pulse rounded bg-muted" />
			</li>
		</>
	);
}

export async function Header({ channel }: { channel: string }) {
	return (
		<header className="sticky top-0 z-40 border-b border-[#e8ddd4] bg-[#faf7f2]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<Logo />

					{/* Search bar */}
					<div className="hidden flex-1 justify-center md:flex">
						<Suspense fallback={<SearchBarSkeleton />}>
							<SearchBar channel={channel} />
						</Suspense>
					</div>

					{/* Nav links */}
					<nav className="hidden items-center gap-6 lg:flex">
						<Suspense fallback={<NavLinksSkeleton />}>
							<NavLinks channel={channel} />
						</Suspense>
					</nav>

					{/* Actions: social icons + user + cart + mobile menu */}
					<div className="flex items-center gap-3">
						{/* Social icons - desktop only */}
						<div className="hidden items-center gap-2 lg:flex">
							<Link
								href="https://www.instagram.com/mac.mac.rame"
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Instagram"
								className="text-[#7a5c4a] transition-colors hover:text-[#3d2b1f]"
							>
								{/* Instagram icon */}
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
								className="text-[#7a5c4a] transition-colors hover:text-[#3d2b1f]"
							>
								{/* Facebook icon */}
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
								</svg>
							</Link>
						</div>

						<Suspense fallback={<div className="h-10 w-10" />}>
							<UserMenuContainer />
						</Suspense>
						<Suspense fallback={<div className="h-10 w-10" />}>
							<CartNavItem channel={channel} />
						</Suspense>
						<Suspense>
							<MobileMenu>
								<Suspense fallback={<SearchBarSkeleton />}>
									<SearchBar channel={channel} />
								</Suspense>
								<Suspense fallback={<NavLinksSkeleton />}>
									<NavLinks channel={channel} />
								</Suspense>
							</MobileMenu>
						</Suspense>
					</div>
				</div>
			</div>
		</header>
	);
}
