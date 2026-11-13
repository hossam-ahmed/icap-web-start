import type { ComponentProps, CSSProperties } from "react";
import { IcapIcon } from "@shared/components/IcapIcon";
import { IcapAmountInput, type AmountInputProps } from "@shared/components/IcapAmountInput";
import "./Amount.css";

export type AmountVariants = "flat" | "field";

type AmountCommonProps = {
	/**
	 * Display: fixed number of decimal places (rounds and pads with zeros).
	 * Editable: maximum decimal places the user can type; shown padded when not focused.
	 * Default: 2.
	 */
	decimals?: number;
	/** Shows the currency icon before the number. Default: `true`. */
	showCurrency?: boolean;
	/** Classes on the wrapper. A `text-*` size class scales the icon and the number (or input) together. */
	className?: string;
	/** Inline styles on the wrapper. */
	style?: CSSProperties;
};

export type AmountDisplayProps = AmountCommonProps & Omit<ComponentProps<"span">, "children" | "className" | "style"> & {
	editable?: false;
	/** The value to display. */
	amount: number;
	/**
	 * Font size of the decimal part only (separator + fraction), as any CSS length,
	 * e.g. `"0.7em"` (relative to the amount) or `"12px"`. Default: same size as the amount.
	 */
	decimalSize?: string;
};

export type AmountEditableProps = AmountCommonProps &
	Omit<AmountInputProps, "value" | "defaultValue" | "onValueChange" | "decimals" | "fixedDecimals" | "className" | "style"> & {
	/** Renders an input instead of text. */
	editable: true;
	/** Current amount (controlled). `null` = empty. */
	amount?: number | null;
	/** Initial amount (uncontrolled). */
	defaultAmount?: number | null;
	/** Called with the parsed amount on every edit (`null` when empty or incomplete). */
	onAmountChange?: (amount: number | null) => void;
	/**
	 * - `field`: a regular form field (border, background), currency icon inside it.
	 * - `flat`: no border, no background; reads like the display amount.
	 *
	 * Default: `"field"`.
	 */
	variant?: AmountVariants;
	/** Class on the `<input>` itself (`className` goes on the wrapper). */
	inputClassName?: string;
};

export type AmountProps = AmountDisplayProps | AmountEditableProps;

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

const Currency = () => <IcapIcon icon='dollar' size='1.2em' className='amount-currency' aria-label='SAR'/>;

const AmountDisplay = ({ amount, decimals = 2, decimalSize, showCurrency = true, className = "", ...props }: AmountDisplayProps) => {
	const { integer, decimal, isZero } = formatAmount(Math.abs(amount), decimals);
	const isNegative = amount < 0 && !isZero;

	return (
		<span dir='ltr' className={ `icap-amount ${ className }` } { ...props }>
			{ showCurrency && <Currency/> }
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

const AmountEditable = ({
	editable: _editable,
	amount,
	defaultAmount,
	onAmountChange,
	decimals = 2,
	variant = "field",
	showCurrency = true,
	className = "",
	style,
	inputClassName = "",
	...inputProps
}: AmountEditableProps) => (
	// A <label>, so clicking anywhere in the field (e.g. the icon) focuses the input
	<label dir='ltr' className={ `icap-amount editable ${ variant } ${ className }` } style={ style }>
		{ showCurrency && <Currency/> }
		<IcapAmountInput
			className={ `amount-input ${ inputClassName }` }
			value={ amount }
			defaultValue={ defaultAmount }
			onValueChange={ onAmountChange }
			decimals={ decimals }
			fixedDecimals
			{ ...inputProps }/>
	</label>
);

/**
 * Monetary amount with the currency icon and thousand separators.
 *
 * - Display (default): formatted text with fixed decimals, e.g. `105257.213` → `⃁105,257.21`.
 *   Extra `<span>` attributes are forwarded to the wrapper.
 * - `editable`: an input that shows `1,234.50` when not focused and the plain `1234.5` while typing.
 *   Choose the look with `variant` (`field` | `flat`). `className`/`style` go on the wrapper;
 *   every other native `<input>` attribute is forwarded to the input.
 *
 * TODO: when the shared Form input component exists, render the editable `field` variant through it
 * (label, error, states) instead of the temporary `.field` styles in Amount.css.
 */
export const IcapAmount = (props: AmountProps) =>
	props.editable ? <AmountEditable { ...props }/> : <AmountDisplay { ...props }/>;
