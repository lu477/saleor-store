"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const STEP = 0.1;
const MIN = 0.1;
const MULTIPLIER = 10; // 1m = 10 Saleor units (0.1m precision)

export function MaterialQuantityInput({ defaultValue = 1 }: { defaultValue?: number }) {
	const [value, setValue] = useState(defaultValue);

	const round = (n: number) => Math.round(n * 10) / 10;
	const increment = () => setValue((v) => round(v + STEP));
	const decrement = () => setValue((v) => Math.max(MIN, round(v - STEP)));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const parsed = parseFloat(e.target.value);
		if (!isNaN(parsed) && parsed >= MIN) {
			setValue(round(parsed));
		}
	};

	return (
		<div className="space-y-2">
			<span className="text-sm font-medium">Količina</span>
			<div className="flex items-center gap-3">
				<div className="flex items-center rounded-lg border border-border">
					<button
						type="button"
						onClick={decrement}
						disabled={value <= MIN}
						className="p-2.5 transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
						aria-label="Smanji za 0.1 m"
					>
						<Minus className="h-4 w-4" />
					</button>
					<input
						type="number"
						min={MIN}
						step={STEP}
						value={value}
						onChange={handleChange}
						className="w-20 bg-transparent py-1 text-center text-sm font-medium tabular-nums focus:outline-none"
						aria-label="Količina u metrima"
					/>
					<button
						type="button"
						onClick={increment}
						className="p-2.5 transition-colors hover:bg-secondary"
						aria-label="Povećaj za 0.1 m"
					>
						<Plus className="h-4 w-4" />
					</button>
				</div>
				<span className="text-sm text-muted-foreground">m</span>
			</div>
			<p className="text-xs text-muted-foreground">Min. {MIN} m · Korak {STEP} m</p>
			{/* Hidden integer quantity for form submission (0.1m per unit) */}
			<input type="hidden" name="quantity" value={Math.round(value * MULTIPLIER)} />
		</div>
	);
}
