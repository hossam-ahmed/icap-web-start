import { type ChangeEvent, type ComponentProps, type FocusEvent, type Ref, useLayoutEffect, useMemo, useRef, useState } from "react";

export type AmountInputProps = Omit<ComponentProps<"input">, "type" | "value" | "defaultValue"> & {
	/** Current amount (controlled). `null` = empty. */
	value?: number | null;
	/** Initial amount (uncontrolled). */
	defaultValue?: number | null;
	/** Called with the parsed amount on every edit (`null` when empty or incomplete, e.g. `"-"`). */
	onValueChange?: (value: number | null) => void;
	/** Maximum number of decimal places the user can type. `0` = whole numbers only. Default: 2. */
	decimals?: number;
	/** Allows a leading minus sign. Default: `false`. */
	allowNegative?: boolean;
	/** When not focused, pad to exactly `decimals` places (`1,500.00`). Default: `false` (`1,500`). */
	fixedDecimals?: boolean;
};

const formatGrouped = (n: number, decimals: number, fixed: boolean) =>
	new Intl.NumberFormat("en-US", { minimumFractionDigits: fixed ? decimals : 0, maximumFractionDigits: decimals }).format(n);

/** Plain number for editing: no separators, no exponent notation (e.g. 1e21 → "1000000000000000000000"). */
const formatPlain = (n: number, decimals: number) =>
	new Intl.NumberFormat("en-US", { maximumFractionDigits: decimals, useGrouping: false }).format(n);

/** Arabic-Indic and Persian digits → Latin digits, so any keyboard works. */
const toLatinDigits = (s: string) =>
	s.replace(/[٠-٩۰-۹]/g, d => String((d.charCodeAt(0) & 0xF) % 10))
	 .replace(/٫/g, "."); // Arabic decimal separator

/** Keeps only what an amount can contain: digits, one ".", an optional leading "-", limited decimals. */
const sanitize = (raw: string, decimals: number, allowNegative: boolean) => {
	const s = toLatinDigits(raw);
	const negative = allowNegative && s.trimStart().startsWith("-");
	const [int = "", ...rest] = s.replace(/[^\d.]/g, "").split(".");
	const hasDot = decimals > 0 && rest.length > 0;
	const fraction = rest.join("").slice(0, decimals);
	return `${ negative ? "-" : "" }${ int }${ hasDot ? "." : "" }${ fraction }`;
};

const mergeRefs = <T, >(...refs: (Ref<T> | undefined)[]) => (node: T | null) => {
	for (const r of refs) {
		if (typeof r === "function") r(node);
		else if (r) r.current = node;
	}
};

const parse = (text: string): number | null => {
	if (!/\d/.test(text)) return null; // "", "-", "."
	const n = Number(text);
	return Number.isFinite(n) ? n : null;
};

/**
 * Bare amount input (no styles). Shows thousand separators when not focused (`1,234,567.5`)
 * and the plain number while the user types (`1234567.5`). Reports the parsed number
 * via `onValueChange`. Every other native `<input>` attribute is forwarded.
 *
 * Its width follows the content through the native `size` attribute, so it scales with the
 * font size (e.g. a `text-2xl` class makes the font, width and height bigger together).
 */
export const AmountInput = ({
	value,
	defaultValue = null,
	onValueChange,
	decimals = 2,
	allowNegative = false,
	fixedDecimals = false,
	onFocus,
	onBlur,
	onChange,
	placeholder,
	size,
	ref,
	...props
}: AmountInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);
	/** Selection to restore after focus swaps the text: "all", or a caret index in the plain text. */
	const pendingSelection = useRef<"all" | number | null>(null);
	const setRefs = useMemo(() => mergeRefs(inputRef, ref), [ref]);

	const isControlled = value !== undefined;
	const [internal, setInternal] = useState<number | null>(defaultValue);
	const amount = isControlled ? value : internal;

	// Text being edited while focused; null when not focused (then the formatted amount is shown)
	const [draft, setDraft] = useState<string | null>(null);

	const text = draft ?? (amount === null ? "" : formatGrouped(amount, decimals, fixedDecimals));

	// Removing the separators replaces the text, which would move the caret to the end.
	// Keep it next to the same digit (click), or keep everything selected (Tab).
	useLayoutEffect(() => {
		const input = inputRef.current;
		const selection = pendingSelection.current;
		if (!input || selection === null) return;
		pendingSelection.current = null;
		if (selection === "all") input.select();
		else input.setSelectionRange(selection, selection);
	});

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		const { selectionStart: start, selectionEnd: end, value: shown } = e.target;
		pendingSelection.current = shown && start === 0 && end === shown.length
			? "all"
			: shown.slice(0, start ?? shown.length).replace(/,/g, "").length;
		setDraft(amount === null ? "" : formatPlain(amount, decimals));
		onFocus?.(e);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		setDraft(null);
		onBlur?.(e);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const next = sanitize(e.target.value, decimals, allowNegative);
		const parsed = parse(next);
		setDraft(next);
		if (!isControlled) setInternal(parsed);
		if (parsed !== amount) onValueChange?.(parsed);
		onChange?.(e);
	};

	return (
		<input
			type='text'
			inputMode='decimal'
			autoComplete='off'
			dir='ltr'
			placeholder={ placeholder }
			size={ size ?? Math.max(text.length, placeholder?.length ?? 0, 1) }
			{ ...props }
			ref={ setRefs }
			value={ text }
			onFocus={ handleFocus }
			onBlur={ handleBlur }
			onChange={ handleChange }/>
	);
};
