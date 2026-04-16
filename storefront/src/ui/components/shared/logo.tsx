/**
 * Shared Logo Component
 *
 * Single source of truth for the storefront logo.
 * Uses external SVG files for better caching and smaller bundle size.
 *
 * - /public/logo.svg: dark logo for light backgrounds
 * - /public/logo-dark.svg: light logo for dark backgrounds
 *
 * @example
 * <Logo className="h-7 w-auto" />                    // Header (auto light/dark)
 * <Logo className="h-7 w-auto" inverted />          // Footer (inverted for dark bg)
 */

interface LogoProps {
	className?: string;
	ariaLabel?: string;
	inverted?: boolean;
}

export const Logo = ({ ariaLabel = "Mac Macrame", inverted = false }: LogoProps) => {
	return (
		<span
			aria-label={ariaLabel}
			className={`font-serif text-xl tracking-wide ${inverted ? "text-[#f5efe6]" : "text-[#3d2b1f]"}`}
		>
			Mac Macrame
		</span>
	);
};
