import type { ComponentProps, ReactNode } from "react";
import { IcapIcon } from "@shared/components/IcapIcon";
import './MarketTicker.css';

export type MarketTickerProps = Omit<ComponentProps<"div">, "children"> & {
	/** The change to display. Sign, color and arrow follow it; shown as its absolute value. */
	amount: number;
	/** No pill background (the text stays green/red). Default: `false`. */
	transparent?: boolean;
	/** Fixed number of decimal places, e.g. `2` → `5.20`. Default: the number as-is. */
	decimals?: number;
	/** Shown right after the number, e.g. `"%"`. */
	suffix?: ReactNode;
	/** Arrow before the sign (`start`) or after the number (`end`). Default: `"start"`. */
	arrowPosition?: "start" | "end";
};

const formatAmount = (value: number, decimals?: number) =>
	decimals === undefined
		? String(value)
		: new Intl.NumberFormat("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);

/**
 * Market change with a trend arrow and sign: green and up for positive, red and down for negative,
 * neutral for zero. Extra `<div>` attributes (`className`, `aria-*`, …) are forwarded.
 */
export const MarketTicker = ({
	amount,
	transparent = false,
	decimals,
	suffix,
	arrowPosition = "start",
	className = "",
	...props
}: MarketTickerProps) => {
	const isTrendUp = amount > 0;
	const isTrendDown = amount < 0;
	const trend = isTrendUp ? "trend-up" : isTrendDown ? "trend-down" : "";
	const arrow = (isTrendUp || isTrendDown) && <IcapIcon icon='arrow' size='0.85em' className={ `ticker-arrow ${ arrowPosition }` }/>;

	return (
		<div className={ `icap-market-ticker ${ transparent ? "transparent" : "" } ${ trend } ${ className }` } { ...props }>
			{ arrowPosition === "start" && arrow }
			{ (isTrendUp || isTrendDown) && <span className='ticker-sign'>{ isTrendUp ? "+" : "-" }</span> }
			<span className='ticker-amount'>{ formatAmount(Math.abs(amount), decimals) }{ suffix }</span>
			{ arrowPosition === "end" && arrow }
		</div>
	);
};
