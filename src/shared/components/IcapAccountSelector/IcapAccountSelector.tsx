import {
	type FocusEvent,
	type ReactNode,
	type Ref,
	startTransition,
	useEffect,
	useId,
	useRef,
	useState,
	ViewTransition
} from "react";
import { IcapAmount } from "@shared/components/IcapAmount";
import { IcapIcon } from "@shared/components/IcapIcon";
import "./IcapAccountSelector.css";
import { IcapBoxPanel } from "@shared/components/IcapBoxPanel";

/** One account in the list. */
export type IcapAccount = {
	/** Unique id; this is the selector's value. */
	id: string;
	/** Account / country name, e.g. `"Saudi"`, `"United States"`. */
	name: string;
	/** ISO currency code, e.g. `"SAR"`, `"USD"`. SAR is shown with the riyal icon. */
	currency: string;
	/** Account number, e.g. `"3001"`. */
	number: string;
	/** Available balance. */
	balance: number;
	/** Image shown in the circle (e.g. a flag). Default: the currency code. */
	image?: string;
	/** The account can't be selected. */
	disabled?: boolean;
};

export type IcapAccountSelectorProps = {
	/** Accounts to choose from. */
	accounts: IcapAccount[];
	/** Selected account id (controlled). `null` = nothing selected. */
	value?: string | null;
	/** Initially selected account id (uncontrolled). */
	defaultValue?: string | null;
	/** Called with the new account id when the user picks an account. */
	onChange?: (value: string, account: IcapAccount) => void;
	/** Called when focus leaves the selector (header and list). For form libraries ("touched"). */
	onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
	/** Name of a hidden input holding the selected id, so the value is submitted with native forms. */
	name?: string;
	/** Small caption at the top of the header, e.g. `"To"`. */
	label?: ReactNode;
	/** Tag at the top end of the header, e.g. `"SIB Capital"`. */
	badge?: ReactNode;
	/** Shown in the header when nothing is selected. Default: `"Select an account"`. */
	placeholder?: ReactNode;
	/** Text before the balance. Default: `"Available balance:"`. */
	balanceLabel?: ReactNode;
	/** Disables the whole selector. */
	disabled?: boolean;
	/** Marks the selector as invalid (red border), e.g. from form validation. */
	invalid?: boolean;
	/** Extra classes on the wrapper. */
	className?: string;
	/** Ref to the header button (focusable); lets form libraries focus the field on errors. */
	ref?: Ref<HTMLButtonElement>;
};

const formatBalance = (balance: number) =>
	new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(balance);

const isSar = (currency: string) => currency.toUpperCase() === "SAR";

/** Riyal icon for SAR, otherwise the currency code. */
const CurrencySymbol = ({ currency }: { currency: string }) =>
	isSar(currency)
		? <IcapIcon icon='dollar' size='1em' className='account-currency-icon' aria-label='SAR'/>
		: <>{ currency }</>;

/** Image (flag) + name/currency/number + available balance. Used in the header and in each option. */
const AccountSummary = ({ account, balanceLabel }: { account: IcapAccount; balanceLabel: ReactNode }) => (
	<span className='account-summary'>
		<span className='account-image'>
			{ account.image
				? <img src={ account.image } alt=''/>
				: <span className='account-image-fallback'>{ account.currency }</span> }
		</span>
		<span className='account-text'>
			<span className='account-title'>
				{ account.name } - <CurrencySymbol currency={ account.currency }/> - { account.number }
			</span>
			<span className='account-balance'>
				{ balanceLabel }{ " " }
				{ isSar(account.currency)
					? <IcapAmount amount={ account.balance } className='account-balance-amount'/>
					: <span dir='ltr'>{ formatBalance(account.balance) }{ account.currency }</span> }
			</span>
		</span>
	</span>
);

/**
 * Account dropdown: a header showing the selected account that opens a list of accounts below it.
 * Picking an account selects it and closes the list; clicking outside closes it too.
 * The list appears and disappears with `<ViewTransition>`.
 *
 * Form-ready: `value` / `onChange` / `onBlur` / `name` / `ref` / `disabled` / `invalid` map directly to
 * a form library field (e.g. react-hook-form's `Controller` `field` + `fieldState.invalid`).
 * Keyboard navigation inside the list isn't implemented yet.
 */
export const IcapAccountSelector = ({
	accounts,
	value,
	defaultValue = null,
	onChange,
	onBlur,
	name,
	label,
	badge,
	placeholder = "Select an account",
	balanceLabel = "Available balance:",
	disabled = false,
	invalid = false,
	className = "",
	ref
}: IcapAccountSelectorProps) => {
	const listId = `${ useId() }-list`;
	const rootRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState(false);
	const [internalValue, setInternalValue] = useState<string | null>(defaultValue);

	const selectedId = value !== undefined ? value : internalValue;
	const selected = accounts.find(a => a.id === selectedId) ?? null;

	// Runs inside a transition so <ViewTransition> animates the list in/out
	const setOpenAnimated = (next: boolean) => startTransition(() => setOpen(next));

	const select = (account: IcapAccount) => {
		if (account.disabled) return;
		if (value === undefined) setInternalValue(account.id);
		if (account.id !== selectedId) onChange?.(account.id, account);
		setOpenAnimated(false);
	};

	// Close on a click outside the selector
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) setOpenAnimated(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);

	// Report blur only when focus leaves the whole selector, not when it moves between its parts
	const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
		if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onBlur?.(e);
	};

	return (
		<div
			ref={ rootRef }
			className={ `icap-account-selector ${ open ? "open" : "" } ${ invalid ? "invalid" : "" } ${ disabled ? "disabled" : "" } ${ className }` }
			onBlur={ handleBlur }>
			{ name && <input type='hidden' name={ name } value={ selectedId ?? "" }/> }

			<button
				ref={ ref }
				type='button'
				className='account-header'
				disabled={ disabled }
				aria-expanded={ open }
				aria-controls={ listId }
				aria-invalid={ invalid || undefined }
				onClick={ () => setOpenAnimated(!open) }>
				{ (label || badge) && (
					<span className='account-header-top'>
						<span className='account-header-label'>{ label }</span>
						{ badge && <span className='account-header-badge'>{ badge }</span> }
					</span>
				) }
				<span className='account-header-main'>
					{ selected
						? <AccountSummary account={ selected } balanceLabel={ balanceLabel }/>
						: <span className='account-placeholder'>{ placeholder }</span> }
					<IcapIcon icon='down-arrow' size='1.25em' className='account-chevron'/>
				</span>
			</button>

			{ open && (
				<ViewTransition>
					<IcapBoxPanel id={ listId } role='listbox' className='account-list'>
						{ accounts.map(account => {
							const isSelected = account.id === selectedId;
							return (
								<li key={ account.id } role='option' aria-selected={ isSelected } aria-disabled={ account.disabled || undefined }>
									<button
										type='button'
										className={ `account-option ${ isSelected ? "selected" : "" }` }
										disabled={ account.disabled }
										onClick={ () => select(account) }>
										<AccountSummary account={ account } balanceLabel={ balanceLabel }/>
										<span className='account-radio' aria-hidden='true'/>
									</button>
								</li>
							);
						}) }
					</IcapBoxPanel>
				</ViewTransition>
			) }
		</div>
	);
};
