import { Suspense } from "react";
import { ProductListByCollectionDocument, ProductOrderField, OrderDirection } from "@/gql/graphql";
import { executePublicGraphQL } from "@/lib/graphql";
import { CACHE_PROFILES, applyCacheProfile } from "@/lib/cache-manifest";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";

export const metadata = {
	title: "Mac Macrame – Svaki čvor priča priču",
	description: "Macramé dekoracije i odeća rađene s ljubavlju i po tvojoj meri!",
};

async function getFeaturedProducts(channel: string) {
	"use cache";
	applyCacheProfile(CACHE_PROFILES.collections, "featured-products");
	const result = await executePublicGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel,
			first: 8,
			sortBy: { field: ProductOrderField.Collection, direction: OrderDirection.Asc },
		},
		revalidate: 300,
	});
	if (!result.ok) return [];
	return result.data.collection?.products?.edges.map(({ node }) => node) ?? [];
}

export default function Page(props: { params: Promise<{ channel: string }> }) {
	return (
		<div className="bg-[#faf7f2]">
			{/* Announcement Bar */}
			<div className="bg-[#5c3d2e] py-2 text-center text-sm text-white tracking-wide">
				Novo! Dostava širom sveta
			</div>

			{/* Hero Section */}
			<section className="relative flex min-h-[70vh] items-center justify-center bg-[#f5efe6] px-4 text-center">
				<div className="max-w-2xl">
					<h1 className="mb-4 font-serif text-5xl font-normal text-[#3d2b1f] md:text-6xl">
						Svaki čvor priča priču
					</h1>
					<p className="mb-8 text-lg text-[#7a5c4a]">
						Macramé dekoracije i odeća rađene s ljubavlju i po tvojoj meri!
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<LinkWithChannel
							href="/products"
							className="rounded-none border border-[#5c3d2e] bg-[#5c3d2e] px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-[#3d2b1f]"
						>
							Poseti prodavnicu
						</LinkWithChannel>
						<LinkWithChannel
							href="/pages/kontakt"
							className="rounded-none border border-[#5c3d2e] px-8 py-3 text-sm uppercase tracking-widest text-[#5c3d2e] transition-colors hover:bg-[#5c3d2e] hover:text-white"
						>
							Kontaktiraj nas
						</LinkWithChannel>
					</div>
				</div>
			</section>

			{/* Category Grid */}
			<section className="mx-auto max-w-7xl px-4 py-16">
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{[
						{ name: "Zavese i dekoracija", slug: "zavese-i-dekoracija" },
						{ name: "Držači za saksije", slug: "drzaci-za-saksije" },
						{ name: "Nameštaj i lampe", slug: "namestaj-i-lampe" },
						{ name: "Odeća i aksesoari", slug: "odeca-i-aksesoari" },
					].map((cat) => (
						<LinkWithChannel
							key={cat.slug}
							href={`/categories/${cat.slug}`}
							className="group relative block aspect-square overflow-hidden bg-[#ede8e0]"
						>
							<div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/40 to-transparent p-4">
								<h3 className="font-serif text-lg text-white">{cat.name}</h3>
							</div>
						</LinkWithChannel>
					))}
				</div>
			</section>

			{/* Best Sellers */}
			<section className="mx-auto max-w-7xl px-4 pb-16">
				<h2 className="mb-4 text-center font-serif text-3xl text-[#3d2b1f]">Najprodavanije</h2>
				<p className="mb-10 text-center text-[#7a5c4a] max-w-2xl mx-auto">
					Ovo su naši najtraženiji komadi – proizvodi koje su naši kupci najviše zavoleli i koji su
					već našli dom u mnogim prostorima.
				</p>
				<Suspense
					fallback={
						<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
							{Array.from({ length: 8 }).map((_, i) => (
								<li key={i} className="animate-pulse">
									<div className="aspect-square bg-[#ede8e0]" />
									<div className="mt-2 h-4 w-32 rounded bg-[#ede8e0]" />
									<div className="mt-1 h-4 w-20 rounded bg-[#ede8e0]" />
								</li>
							))}
						</ul>
					}
				>
					<FeaturedProducts params={props.params} />
				</Suspense>
				<div className="mt-10 text-center">
					<LinkWithChannel
						href="/products"
						className="inline-block rounded-none border border-[#5c3d2e] px-10 py-3 text-sm uppercase tracking-widest text-[#5c3d2e] transition-colors hover:bg-[#5c3d2e] hover:text-white"
					>
						Svi proizvodi
					</LinkWithChannel>
				</div>
			</section>

			{/* About Stats */}
			<section className="bg-[#f0e8db] py-16 text-center">
				<div className="mx-auto max-w-4xl px-4">
					<p className="mb-2 text-sm uppercase tracking-widest text-[#7a5c4a]">
						100% prirodno i ručno rađeno
					</p>
					<div className="mt-8 flex justify-center gap-16">
						<div>
							<div className="font-serif text-4xl text-[#3d2b1f]">10+</div>
							<div className="mt-1 text-sm text-[#7a5c4a]">godina tradicije</div>
						</div>
						<div>
							<div className="font-serif text-4xl text-[#3d2b1f]">1000+</div>
							<div className="mt-1 text-sm text-[#7a5c4a]">zadovoljnih mušterija</div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission */}
			<section className="mx-auto max-w-4xl px-4 py-16 text-center">
				<p className="mb-4 text-sm uppercase tracking-widest text-[#7a5c4a]">naša misija</p>
				<h2 className="mb-6 font-serif text-3xl text-[#3d2b1f]">Iz ljubavi prema unikatnom</h2>
				<p className="text-[#7a5c4a] leading-relaxed">
					Naša misija je da kroz ručnu izradu macramé komada unesemo lepotu, toplinu i autentičnost u
					svaki dom i garderober. Verujemo u snagu detalja, prirodnih materijala i unikatnosti – jer
					svaki prostor i osoba zaslužuju nešto posebno.
				</p>
				<LinkWithChannel
					href="/pages/o-nama"
					className="mt-8 inline-block text-sm uppercase tracking-widest text-[#5c3d2e] underline underline-offset-4"
				>
					Više o nama
				</LinkWithChannel>
			</section>

			{/* Testimonials */}
			<section className="bg-[#f5efe6] px-4 py-16">
				<div className="mx-auto max-w-6xl">
					<h2 className="mb-10 text-center font-serif text-3xl text-[#3d2b1f]">
						Šta su rekli naši kupci
					</h2>
					<div className="grid gap-8 md:grid-cols-3">
						{[
							{
								text: "Macramé ljuljaška je apsolutno savršena! Čvrsta, udobna i pravi statement komad za našu terasu. Sve preporuke",
								name: "Jelena R.",
								city: "Novi Sad",
							},
							{
								text: "Oduševljena sam personalizacijom! Dogovor je tekao glatko, a torba je stigla prelepo upakovana. Definitivno naručujem ponovo!",
								name: "Ana S.",
								city: "Kruševac",
							},
							{
								text: "Kvalitet konca i izrade je vrhunski. Ovakva ručna izrada se retko viđa. Svaki čvor je savršen.",
								name: "Katarina N.",
								city: "Trebinje",
							},
						].map((t) => (
							<div key={t.name} className="bg-white p-6 shadow-sm">
								<p className="italic text-[#7a5c4a]">&ldquo;{t.text}&rdquo;</p>
								<div className="mt-4">
									<div className="font-medium text-[#3d2b1f]">{t.name}</div>
									<div className="text-sm text-[#7a5c4a]">{t.city}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Newsletter */}
			<section className="bg-[#5c3d2e] px-4 py-16 text-center text-white">
				<h2 className="mb-2 font-serif text-3xl">Postanite deo našeg kluba lojalnosti!</h2>
				<p className="mb-8 text-[#d4b8a8]">
					Želite da prvi saznate za naše nove proizvode, ostvarite popuste i ekskluzivne pogodnosti?
				</p>
				<form className="mx-auto flex max-w-md gap-2">
					<input
						type="email"
						placeholder="Vaša email adresa"
						className="flex-1 rounded-none border border-[#d4b8a8] bg-transparent px-4 py-3 text-white placeholder-[#d4b8a8] focus:outline-none focus:border-white"
					/>
					<button
						type="submit"
						className="rounded-none bg-white px-6 py-3 text-sm uppercase tracking-widest text-[#5c3d2e] transition-colors hover:bg-[#f5efe6]"
					>
						Postani član
					</button>
				</form>
			</section>
		</div>
	);
}

async function FeaturedProducts({ params: paramsPromise }: { params: Promise<{ channel: string }> }) {
	const { channel } = await paramsPromise;
	const products = await getFeaturedProducts(channel);
	return (
		<ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{products.map((product) => (
				<li key={product.id}>
					<LinkWithChannel href={`/products/${product.slug}`} className="group block">
						<div className="aspect-square overflow-hidden bg-[#ede8e0]">
							{product.thumbnail && (
								<img
									src={product.thumbnail.url}
									alt={product.thumbnail.alt || product.name}
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
								/>
							)}
						</div>
						<div className="mt-3">
							<h3 className="font-serif text-[#3d2b1f]">{product.name}</h3>
							<p className="mt-1 text-sm text-[#7a5c4a]">
								{product.pricing?.priceRange?.start?.gross?.amount}{" "}
								{product.pricing?.priceRange?.start?.gross?.currency}
							</p>
						</div>
					</LinkWithChannel>
				</li>
			))}
		</ul>
	);
}
