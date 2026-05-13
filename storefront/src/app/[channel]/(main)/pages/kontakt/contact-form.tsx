"use client";

import { useState } from "react";

export function ContactForm() {
	const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
	const [form, setForm] = useState({ name: "", email: "", product: "", message: "" });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("sending");
		// TODO: replace with a real email service (e.g. Resend, Formspree)
		await new Promise((r) => setTimeout(r, 1000));
		setStatus("sent");
	};

	if (status === "sent") {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<div className="mb-4 text-4xl">✉️</div>
				<h3 className="mb-2 font-serif text-xl text-[#3d2b1f]">Poruka poslata!</h3>
				<p className="text-sm text-[#7a5c4a]">Javićemo vam se što pre. Hvala na poverenju!</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div>
				<label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#3d2b1f]">
					Vaše ime <span className="text-red-500">*</span>
				</label>
				<input
					id="name"
					name="name"
					type="text"
					required
					value={form.name}
					onChange={handleChange}
					className="w-full border border-[#e8ddd4] bg-white px-4 py-3 text-sm text-[#3d2b1f] placeholder-[#c4a898] focus:border-[#5c3d2e] focus:outline-none"
					placeholder="Vaše ime"
				/>
			</div>
			<div>
				<label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#3d2b1f]">
					Vaša e-mail adresa <span className="text-red-500">*</span>
				</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					value={form.email}
					onChange={handleChange}
					className="w-full border border-[#e8ddd4] bg-white px-4 py-3 text-sm text-[#3d2b1f] placeholder-[#c4a898] focus:border-[#5c3d2e] focus:outline-none"
					placeholder="vas@email.com"
				/>
			</div>
			<div>
				<label htmlFor="product" className="mb-1.5 block text-sm font-medium text-[#3d2b1f]">
					Naziv proizvoda
				</label>
				<input
					id="product"
					name="product"
					type="text"
					value={form.product}
					onChange={handleChange}
					className="w-full border border-[#e8ddd4] bg-white px-4 py-3 text-sm text-[#3d2b1f] placeholder-[#c4a898] focus:border-[#5c3d2e] focus:outline-none"
					placeholder="npr. Makrame zavesa, Ljuljaška..."
				/>
			</div>
			<div>
				<label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#3d2b1f]">
					Vaša poruka <span className="text-red-500">*</span>
				</label>
				<textarea
					id="message"
					name="message"
					required
					rows={5}
					value={form.message}
					onChange={handleChange}
					className="w-full border border-[#e8ddd4] bg-white px-4 py-3 text-sm text-[#3d2b1f] placeholder-[#c4a898] focus:border-[#5c3d2e] focus:outline-none"
					placeholder="Opišite šta vam treba — boje, dimenzije, posebne zahteve..."
				/>
			</div>
			<button
				type="submit"
				disabled={status === "sending"}
				className="w-full bg-[#5c3d2e] px-8 py-3 text-sm uppercase tracking-widest text-white transition-colors hover:bg-[#3d2b1f] disabled:opacity-60"
			>
				{status === "sending" ? "Slanje..." : "Pošalji"}
			</button>
		</form>
	);
}
