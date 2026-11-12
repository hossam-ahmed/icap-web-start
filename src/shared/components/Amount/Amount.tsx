import type { ComponentProps } from "react";
import { IcapIcon } from "@shared/components/IcapIcon";
import "./Amount.css";

export type AmountProps = Omit<ComponentProps<"span">, "children"> & {
	/** The value to display. */
	amount: number;
	/** Number of decimal places (fixed; pads with zeros and rounds). Default: 2. */
	decimals?: number;
	/**
	 * Font size of the decimal part only (separator + fraction), as any CSS length,
	 * e.g. `"0.7em"` (relative to the amount) or `"12px"`. Default: same size as the amount.
	 */
	decimalSize?: string;
};

/** Splits a formatted number into its integer part (`105,257`) and decimal part (`.21`). */
const formatAmount = (value: number, decimals: number) => {
	const digits = Math.min(Math.max(Math.trunc(decimals), 0), 20);
	const parts = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	}).formatToParts(value);

	const isDecimalPart = (type: Intl.NumberFormatPartTypes) => type === "decimal" || type === "fraction";
	return {
		integer: parts.filter(p => !isDecimalPart(p.type)).map(p => p.value).join(""),
		decimal: parts.filter(p => isDecimalPart(p.type)).map(p => p.value).join(""),
		isZero : parts.every(p => p.type !== "integer" && p.type !== "fraction" || /^0+$/.test(p.value))
	};
};

/**
 * Displays a monetary amount with the currency icon, thousand separators and fixed decimals,
 * e.g. `105257.213` → `⃁105,257.21`. Extra span attributes are forwarded to the wrapper.
 */
export const Amount = ({ amount, decimals = 2, decimalSize, className = "", ...props }: AmountProps) => {
	const { integer, decimal, isZero } = formatAmount(Math.abs(amount), decimals);
	const isNegative = amount < 0 && !isZero;

	return (
		<span dir='ltr' className={ `icap-amount ${ className }` } { ...props }>
			<IcapIcon icon='dollar' size='1.2em' className='amount-currency' aria-label='SAR'/>
			{ isNegative && <span className='amount-sign'>-</span> }
			<span className='amount-value'>
				<span className='amount-integer'>{ integer }</span>
				{ decimal && <span className='amount-decimal' style={ decimalSize ? { fontSize: decimalSize } : undefined }>
					{ decimal }
				</span> }
			</span>
		</span>
	);
};
