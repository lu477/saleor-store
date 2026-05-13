import { type Metadata } from "next";
import { LinkWithChannel } from "@/ui/atoms/link-with-channel";
import { FaqAccordion } from "./faq-accordion";

export const metadata: Metadata = {
	title: "FAQ · Mac Macrame",
	description:
		"Često postavljana pitanja o Mac Macrame proizvodima — narudžbine, rokovi, materijali, dostava i povrat.",
};

const faqs = [
	{
		question: "Da li je moguća personalizovana narudžbina?",
		answer:
			"Da, većinu proizvoda pravimo po narudžbini! Možete odabrati dimenzije, boje konca i specifične detalje. Kontaktirajte nas pre kupovine kako bismo dogovorili sve detalje.",
	},
	{
		question: "Koji je rok izrade i dostave?",
		answer:
			"Mali predmeti: 2–4 radna dana. Veći komadi poput zavesa i zidnih dekoracija: 7–10 radnih dana. Dostava unutar Srbije traje 1–2 radna dana. Za međunarodne narudžbine pišite nam za tačne rokove.",
	},
	{
		question: "Od kojih materijala su napravljeni vaši proizvodi?",
		answer:
			"Koristimo 100% pamučni macramé kanap i prirodno drvo. Svi predmeti su ručno rađeni bez industrijskih procesa — nema sintetike ni veštačkih materijala.",
	},
	{
		question: "Kako da se brinem o macramé predmetima?",
		answer:
			"Usisajte ili nežno prašite predmete. Pranje rukama u hladnoj vodi bez jakih deterdženata je prihvatljivo. Nakon pranja osušite na vazduhu — ne koristite sušilicu.",
	},
	{
		question: "Da li šaljete u inostranstvo?",
		answer:
			"Da, šaljemo širom sveta! Pišite nam za informacije o tačnim troškovima dostave i rokovima za vašu destinaciju.",
	},
	{
		question: "Kako se vešaju makrame zavese?",
		answer:
			"Makrame zavese se mogu okačiti na standardne šipke, drvene motke ili kuke. Zavese obično dolaze s već pričvršćenim drvenim prstenovima — instalacija je jednostavna i ne zahteva poseban alat.",
	},
	{
		question: "Da li su ljuljačke bezbedne?",
		answer:
			"Ljuljačke za odrasle imaju metalnu konstrukciju i debeo pamučni kanap koji obezbeđuju trajnost i stabilnost. Svaku ljuljašku testiramo pre isporuke.",
	},
	{
		question: "Da li je moguć povrat ili zamena?",
		answer:
			"Zbog ručne i personalizovane prirode svakog komada, povrat generalno nije moguć. Izuzetak su greške s naše strane — u tom slučaju ćemo sve rešiti u vaše zadovoljstvo. Pišite nam i pronašli ćemo rešenje.",
	},
];

export default function FaqPage() {
	return (
		<main>
			{/* Hero */}
			<section className="bg-[#f5efe6] px-4 py-20 text-center">
				<p className="mb-3 text-sm uppercase tracking-widest text-[#7a5c4a]">pomoć</p>
				<h1 className="font-serif text-5xl text-[#3d2b1f] md:text-6xl">FAQ</h1>
				<div className="mx-auto mt-4 h-0.5 w-16 bg-[#c4a898]" />
				<p className="mx-auto mt-6 max-w-xl text-[#7a5c4a]">
					Naša misija je da vaše iskustvo sa našim proizvodima i uslugama bude što jednostavnije i
					prijatnije!
				</p>
			</section>

			{/* FAQ list */}
			<section className="mx-auto max-w-3xl px-4 py-16">
				<FaqAccordion items={faqs} />
			</section>

			{/* Still have questions */}
			<section className="bg-[#faf7f2] px-4 py-16 text-center">
				<h2 className="mb-3 font-serif text-2xl text-[#3d2b1f]">Niste pronašli odgovor?</h2>
				<p className="mb-8 text-[#7a5c4a]">
					Slobodno nas kontaktirajte — odgovorićemo vam što pre!
				</p>
				<LinkWithChannel
					href="/pages/kontakt"
					className="inline-block bg-[#5c3d2e] px-10 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-[#3d2b1f]"
				>
					Pišite nam
				</LinkWithChannel>
			</section>
		</main>
	);
}
