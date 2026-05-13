import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata: Metadata = {
	title: "O nama · Mac Macrame",
	description:
		"Saznajte više o Mac Macrame – maloj, strastvnoj prodavnici ručno rađenih macramé dekoracija i odeće.",
};

export default function ONamePage() {
	return (
		<main>
			{/* Hero */}
			<section className="bg-[#f5efe6] px-4 py-20 text-center">
				<p className="mb-3 text-sm uppercase tracking-widest text-[#7a5c4a]">naša priča</p>
				<h1 className="font-serif text-5xl text-[#3d2b1f] md:text-6xl">O nama</h1>
				<div className="mx-auto mt-4 h-0.5 w-16 bg-[#c4a898]" />
			</section>

			{/* Intro */}
			<section className="mx-auto max-w-3xl px-4 py-16 text-center">
				<h2 className="mb-6 font-serif text-3xl text-[#3d2b1f]">MAC MACRAME</h2>
				<p className="leading-relaxed text-[#7a5c4a]">
					Mac Macrame je mala, strastvena prodavnica ručno rađenih macramé predmeta — od dekoracija za dom
					poput zavesa, lampi i držača za saksije, do odeće i aksesoara. Sve što radimo nastaje s pažnjom,
					posvećenošću i ljubavlju prema unikatnom.
				</p>
				<p className="mt-4 leading-relaxed text-[#7a5c4a]">
					Naša filozofija: boho stil, prirodni materijali i personalizacija. Svaki komad stvaramo s ciljem
					da bude ne samo lep, već i funkcionalan — stvoren baš za vas.
				</p>
			</section>

			{/* Values grid */}
			<section className="bg-[#faf7f2] px-4 py-16">
				<div className="mx-auto max-w-5xl">
					<p className="mb-10 text-center text-sm uppercase tracking-widest text-[#7a5c4a]">
						zašto Mac Macrame
					</p>
					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								title: "100% ručna izrada",
								body: "Svaki čvor vežemo ručno, bez industrijskih procesa. To znači da je svaki komad jedinstven i nosi pečat naše pažnje.",
							},
							{
								title: "Prirodni materijali",
								body: "Koristimo 100% pamučni macramé kanap i prirodno drvo. Nema sintetike — samo materijali koji su dobri i za vas i za planetu.",
							},
							{
								title: "Personalizacija",
								body: "Možete odabrati dimenzije, boje konca i specifične detalje. Radujemo se svakoj narudžbini po meri.",
							},
						].map((item) => (
							<div key={item.title} className="bg-white p-8 shadow-sm">
								<div className="mb-4 h-0.5 w-8 bg-[#c4a898]" />
								<h3 className="mb-3 font-serif text-xl text-[#3d2b1f]">{item.title}</h3>
								<p className="text-sm leading-relaxed text-[#7a5c4a]">{item.body}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Origin story */}
			<section className="mx-auto max-w-3xl px-4 py-16">
				<h2 className="mb-6 text-center font-serif text-3xl text-[#3d2b1f]">Kako je sve počelo</h2>
				<p className="leading-relaxed text-[#7a5c4a]">
					Sve je počelo od želje da ukrasimo sopstveni prostor u boho stilu. Ubrzo smo otkrili da macramé
					nije samo tehnika — to je meditacija, umetnost i način izražavanja. Kombinacija drveta i
					macraméa otvorila nam je sasvim novi svet kreativnosti.
				</p>
				<p className="mt-4 leading-relaxed text-[#7a5c4a]">
					Danas pravimo prilagođene komade za domove širom sveta, uvek s istom pažnjom i ljubavlju s kojom
					smo počeli. Svaki čvor priča priču — i drago nam je što je deo vaše.
				</p>
			</section>

			{/* Categories */}
			<section className="bg-[#f5efe6] px-4 py-16">
				<div className="mx-auto max-w-5xl">
					<p className="mb-10 text-center text-sm uppercase tracking-widest text-[#7a5c4a]">
						šta pravimo
					</p>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
						{[
							{ label: "Nameštaj i lampe", slug: "namestaj-i-lampe" },
							{ label: "Odeća i aksesoari", slug: "odeca-i-aksesoari" },
							{ label: "Držači za saksije", slug: "drzaci-za-saksije" },
							{ label: "Zavese i dekoracija", slug: "zavese-i-dekoracija" },
							{ label: "Dečiji predmeti", slug: "deciji-predmeti" },
						].map((cat) => (
							<LinkWithChannel
								key={cat.slug}
								href={`/categories/${cat.slug}`}
								className="group flex flex-col items-center gap-3 rounded-lg bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
							>
								<span className="text-2xl">🧵</span>
								<span className="text-sm font-medium text-[#3d2b1f] group-hover:text-[#5c3d2e]">
									{cat.label}
								</span>
							</LinkWithChannel>
						))}
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="bg-[#5c3d2e] px-4 py-16 text-center text-white">
				<div className="mx-auto max-w-4xl">
					<div className="flex flex-wrap justify-center gap-16">
						{[
							{ number: "10+", label: "godina tradicije" },
							{ number: "1000+", label: "zadovoljnih kupaca" },
							{ number: "100%", label: "ručna izrada" },
							{ number: "🌍", label: "dostava širom sveta" },
						].map((stat) => (
							<div key={stat.label}>
								<div className="font-serif text-4xl">{stat.number}</div>
								<div className="mt-1 text-sm text-[#d4b8a8]">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="px-4 py-16 text-center">
				<h2 className="mb-4 font-serif text-3xl text-[#3d2b1f]">Pronađite svoj komad</h2>
				<p className="mb-8 text-[#7a5c4a]">
					Svaki prostor zaslužuje nešto posebno. Pogledajte našu kolekciju ili nas kontaktirajte za
					personalizovanu narudžbinu.
				</p>
				<div className="flex flex-wrap justify-center gap-4">
					<LinkWithChannel
						href="/products"
						className="rounded-none bg-[#5c3d2e] px-10 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-[#3d2b1f]"
					>
						Poseti prodavnicu
					</LinkWithChannel>
					<LinkWithChannel
						href="/pages/kontakt"
						className="rounded-none border border-[#5c3d2e] px-10 py-3 text-sm uppercase tracking-widest text-[#5c3d2e] transition-colors hover:bg-[#5c3d2e] hover:text-white"
					>
						Kontaktiraj nas
					</LinkWithChannel>
				</div>
			</section>
		</main>
	);
}
