import { type Metadata } from "next";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
	title: "Kontakt · Mac Macrame",
	description:
		"Imate pitanje? Tu smo da pomognemo! Pišite nam za personalizovane narudžbine, boje, dimenzije i sve ostalo.",
};

export default function KontaktPage() {
	return (
		<main>
			{/* Hero */}
			<section className="bg-[#f5efe6] px-4 py-20 text-center">
				<p className="mb-3 text-sm uppercase tracking-widest text-[#7a5c4a]">pišite nam</p>
				<h1 className="font-serif text-5xl text-[#3d2b1f] md:text-6xl">Kontakt</h1>
				<div className="mx-auto mt-4 h-0.5 w-16 bg-[#c4a898]" />
				<p className="mx-auto mt-6 max-w-xl text-[#7a5c4a]">Imate pitanje? Tu smo da pomognemo!</p>
			</section>

			<section className="mx-auto max-w-5xl px-4 py-16">
				<div className="grid gap-12 md:grid-cols-2">
					{/* Left: info */}
					<div>
						<h2 className="mb-4 font-serif text-2xl text-[#3d2b1f]">Kako možemo pomoći?</h2>
						<p className="mb-8 leading-relaxed text-[#7a5c4a]">
							Svi naši proizvodi su ručno rađeni s puno ljubavi, sa željom da budu stvoreni baš za vas.
							Pišite nam slobodno za personalizovane narudžbine — odabir boja, dimenzija, ili bilo koje
							druge detalje.
						</p>

						<div className="space-y-6">
							{[
								{
									icon: "📦",
									title: "Personalizovane narudžbine",
									body: "Odaberite boje, dimenzije i specifične detalje — svaki komad pravimo posebno za vas.",
								},
								{
									icon: "🚚",
									title: "Dostava",
									body: "Šaljemo širom Srbije i sveta. Pišite nam za informacije o troškovima i rokovima.",
								},
								{
									icon: "⏱️",
									title: "Rok izrade",
									body: "Mali predmeti: 2–4 dana. Veći komadi (zavese, zidne dekoracije): 7–10 dana.",
								},
							].map((item) => (
								<div key={item.title} className="flex items-start gap-4">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5efe6] text-lg">
										{item.icon}
									</div>
									<div>
										<h3 className="font-medium text-[#3d2b1f]">{item.title}</h3>
										<p className="mt-1 text-sm text-[#7a5c4a]">{item.body}</p>
									</div>
								</div>
							))}
						</div>

						{/* Social */}
						<div className="mt-10">
							<p className="mb-4 text-sm font-medium text-[#3d2b1f]">Pratite nas</p>
							<div className="flex gap-4">
								<a
									href="https://www.instagram.com/mac.mac.rame"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sm text-[#7a5c4a] transition-colors hover:text-[#5c3d2e]"
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
										<circle cx="12" cy="12" r="4" />
										<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
									</svg>
									Instagram
								</a>
								<a
									href="https://www.facebook.com/profile.php?id=61558148182063"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 text-sm text-[#7a5c4a] transition-colors hover:text-[#5c3d2e]"
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
									</svg>
									Facebook
								</a>
							</div>
						</div>
					</div>

					{/* Right: form */}
					<div className="bg-[#faf7f2] p-8">
						<h2 className="mb-6 font-serif text-2xl text-[#3d2b1f]">Pošaljite poruku</h2>
						<ContactForm />
					</div>
				</div>
			</section>
		</main>
	);
}
