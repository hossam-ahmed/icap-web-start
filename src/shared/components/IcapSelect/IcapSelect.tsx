import {
	Children,
	type ComponentProps,
	createContext,
	type FocusEvent,
	isValidElement,
	type ReactElement,
	type ReactNode,
	type Ref,
	startTransition,
	use,
	useEffect,
	useId,
	useRef,
	useState,
	ViewTransition
} from "react";
import { type ButtonVariants, IcapButton } from "@shared/components/IcapButton";
import { IcapIcon } from "@shared/components/IcapIcon";
import "./IcapSelect.css";

/** An IcapButton variant, filled or outlined. */
export type IcapSelectVariants = ButtonVariants | `${ ButtonVariants }-outlined`;

export type IcapSelectProps = {
	/** `<IcapOption>` elements. */
	children?: ReactNode;
	/** Selected option value (controlled). `null` = nothing selected. */
	value?: string | null;
	/** Initially selected option value (uncontrolled). */
	defaultValue?: string | null;
	/** Called with the new value when the user picks an option. */
	onChange?: (value: string) => void;
	/** Called when focus leaves the select (trigger and list). For form libraries ("touched"). */
	onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
	/** Shown in the trigger when nothing is selected. */
	placeholder?: ReactNode;
	/** Trigger style: an `IcapButton` variant, filled or `-outlined`. Default: `"alternate"`. */
	variant?: IcapSelectVariants;
	/** Name of a hidden input holding the value, so it's submitted with native forms. */
	name?: string;
	/** Disables the select. */
	disabled?: boolean;
	/** Marks the select as invalid (red border), e.g. from form validation. */
	invalid?: boolean;
	/** Extra classes on the wrapper. */
	className?: string;
	/** Extra classes on the trigger button (e.g. a width, text size). */
	triggerClassName?: string;
	/** Accessible name when there's no visible label. */
	"aria-label"?: string;
	/** Ref to the trigger button (focusable); lets form libraries focus the field on errors. */
	ref?: Ref<HTMLButtonElement>;
};

export type IcapOptionProps = Omit<ComponentProps<"button">, "value" | "type" | "onClick"> & {
	/** The option's value. */
	value: string;
	/** Option template: any content. */
	children?: ReactNode;
	/** What the trigger shows when this option is selected. Default: the option's children. */
	label?: ReactNode;
	/** The option can't be selected. */
	disabled?: boolean;
};

type SelectContextValue = {
	selectedValue: string | null;
	select: (value: string) => void;
};

const SelectContext = createContext<SelectContextValue | null>(null);

/**
 * One option of an `IcapSelect`. Its children are the option's template (any content);
 * the same content is shown in the trigger when selected, unless `label` is given.
 */
export const IcapOption = ({ value, children, label: _label, disabled, className = "", ...props }: IcapOptionProps) => {
	const ctx = use(SelectContext);
	if (!ctx) throw new Error("<IcapOption> must be rendered inside <IcapSelect>.");
	const selected = ctx.selectedValue === value;

	return (
		<li role='option' aria-selected={ selected } aria-disabled={ disabled || undefined }>
			<button
				type='button'
				className={ `select-option ${ selected ? "selected" : "" } ${ className }` }
				disabled={ disabled }
				onClick={ () => ctx.select(value) }
				{ ...props }>
				<span className='select-option-content'>{ children }</span>
				<svg className='select-option-check' viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
					<path d='M3.5 8.5l3 3 6-7' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
				</svg>
			</button>
		</li>
	);
};

/** Reads the `IcapOption` elements among the children (direct children or arrays of them). */
const findOptions = (children: ReactNode) =>
	Children.toArray(children)
		.filter((c): c is ReactElement<IcapOptionProps> => isValidElement(c) && c.type === IcapOption);

/**
 * Custom select: a trigger button that opens a floating list of `<IcapOption>`s.
 * Picking an option selects it and closes the list; clicking outside or Escape closes it too.
 * The list appears and disappears with `<ViewTransition>`.
 *
 * ```tsx
 * <IcapSelect placeholder="Sort by" value={sort} onChange={setSort}>
 *   <IcapOption value="amount">Amount</IcapOption>
 *   <IcapOption value="date">Date</IcapOption>
 * </IcapSelect>
 * ```
 *
 * Form-ready: `value` / `onChange` / `onBlur` / `name` / `ref` / `disabled` / `invalid` map directly to
 * a form library field (e.g. react-hook-form's `Controller` `field` + `fieldState.invalid`).
 * Arrow-key navigation inside the list isn't implemented yet.
 */
export const IcapSelect = ({
	children,
	value,
	defaultValue = null,
	onChange,
	onBlur,
	placeholder,
	variant = "alternate",
	name,
	disabled = false,
	invalid = false,
	className = "",
	triggerClassName = "",
	"aria-label": ariaLabel,
	ref
}: IcapSelectProps) => {
	const listId = `${ useId() }-list`;
	const rootRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState<string | null>(defaultValue);

	// "secondary-outlined" → IcapButton variant "secondary" + outlined
	const outlined = variant.endsWith("-outlined");
	const buttonVariant = variant.replace("-outlined", "") as ButtonVariants;

	const selectedValue = value !== undefined ? value : internalValue;
	const selectedOption = findOptions(children).find(o => o.props.value === selectedValue);

	// Runs inside a transition so <ViewTransition> animates the list in/out
	const setOpenAnimated = (next: boolean) => startTransition(() => setOpen(next));

	const select = (next: string) => {
		if (value === undefined) setInternalValue(next);
		if (next !== selectedValue) onChange?.(next);
		setOpenAnimated(false);
	};

	// While open: close on a click outside, or on Escape
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpenAnimated(false);
		};
		const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpenAnimated(false);
		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	// Report blur only when focus leaves the whole select, not when it moves between its parts
	const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onBlur?.(e);
	};

	return (
		<div
			ref={ rootRef }
			className={ `icap-select ${ variant } ${ open ? "open" : "" } ${ invalid ? "invalid" : "" } ${ className }` }
			onBlur={ handleBlur }>
			{ name && <input type='hidden' name={ name } value={ selectedValue ?? "" }/> }

			<IcapButton
				ref={ ref }
				variant={ buttonVariant }
				outlined={ outlined }
				className={ `select-trigger ${ triggerClassName }` }
				disabled={ disabled }
				aria-haspopup='listbox'
				aria-expanded={ open }
				aria-controls={ listId }
				aria-label={ ariaLabel }
				aria-invalid={ invalid || undefined }
				onClick={ () => setOpenAnimated(!open) }>
				<span className={ `select-value ${ selectedOption ? "" : "placeholder" }` }>
					{ selectedOption ? (selectedOption.props.label ?? selectedOption.props.children) : placeholder }
				</span>
				<IcapIcon icon='down-arrow' size='1em' className='select-chevron'/>
			</IcapButton>

			{ open && (
				<ViewTransition>
					<ul id={ listId } role='listbox' className='select-list'>
						<SelectContext value={ { selectedValue, select } }>
							{ children }
						</SelectContext>
					</ul>
				</ViewTransition>
			) }
		</div>
	);
};
