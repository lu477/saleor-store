"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
	question: string;
	answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<div className="divide-y divide-[#e8ddd4]">
			{items.map((item, i) => (
				<div key={i}>
					<button
						onClick={() => setOpen(open === i ? null : i)}
						className="flex w-full items-center justify-between py-5 text-left"
						aria-expanded={open === i}
					>
						<span className="pr-4 font-medium text-[#3d2b1f]">{item.question}</span>
						<ChevronDown
							className={cn(
								"h-5 w-5 shrink-0 text-[#7a5c4a] transition-transform duration-200",
								open === i && "rotate-180",
							)}
						/>
					</button>
					{open === i && (
						<div className="pb-5 text-sm leading-relaxed text-[#7a5c4a]">{item.answer}</div>
					)}
				</div>
			))}
		</div>
	);
}
