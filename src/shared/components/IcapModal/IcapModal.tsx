import {
	type ComponentProps,
	createContext,
	type MouseEvent,
	type SyntheticEvent,
	use,
	useEffect,
	useId,
	useRef
} from "react";
import "./IcapModal.css";

export type ModalProps = Omit<ComponentProps<"dialog">, "open" | "onClose" | "onCancel"> & {
	/** Whether the modal is shown (controlled). */
	open: boolean;
	/** Called when the user asks to close: close button, Escape key or backdrop click. */
	onClose?: () => void;
	/** Shows the × close button in the top corner. Default: `false`. */
	closable?: boolean;
	/** Accessible label of the close button. Default: `"Close"`. */
	closeLabel?: string;
	/** Close when clicking the backdrop outside the modal. Default: `true`. */
	closeOnBackdropClick?: boolean;
};
export type ModalHeaderProps = ComponentProps<"div"> & {
	/** Adds a 1px bottom border (border-color-primary) under the header. Default: `false`. */
	bordered?: boolean;
};
export type ModalContentProps = ComponentProps<"div">;
export type ModalFooterProps = ComponentProps<"div">;

/** Lets the header label the dialog for screen readers. */
const ModalContext = createContext<{ titleId: string } | null>(null);

const ModalHeader = ({ bordered = false, className = "", ...props }: ModalHeaderProps) => {
	const ctx = use(ModalContext);
	return <div id={ ctx?.titleId } className={ `modal-header ${ bordered ? "bordered" : "" } ${ className }` } { ...props }/>;
};

const ModalContent = ({ className = "", ...props }: ModalContentProps) =>
	<div className={ `modal-content ${ className }` } { ...props }/>;

const ModalFooter = ({ className = "", ...props }: ModalFooterProps) =>
	<div className={ `modal-footer ${ className }` } { ...props }/>;

const ModalRoot = ({
	open,
	onClose,
	closable = false,
	closeLabel = "Close",
	closeOnBackdropClick = true,
	className = "",
	children,
	onClick,
	...props
}: ModalProps) => {
	const ref = useRef<HTMLDialogElement>(null);
	const titleId = `${ useId() }-title`;

	// Sync the native dialog with `open`: showModal() gives the backdrop, top layer and makes the page behind inert
	useEffect(() => {
		const dialog = ref.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		else if (!open && dialog.open) dialog.close();
	}, [open]);

	// Escape: keep the dialog open and let the parent decide via onClose (state stays the source of truth)
	const handleCancel = (e: SyntheticEvent<HTMLDialogElement>) => {
		e.preventDefault();
		onClose?.();
	};

	// A click whose target is the <dialog> itself landed on the backdrop (the content fills the box)
	const handleClick = (e: MouseEvent<HTMLDialogElement>) => {
		onClick?.(e);
		if (closeOnBackdropClick && e.target === e.currentTarget) onClose?.();
	};

	return (
		<dialog
			ref={ ref }
			aria-labelledby={ titleId }
			className={ `icap-modal ${ closable ? "closable" : "" } ${ className }` }
			onCancel={ handleCancel }
			onClick={ handleClick }
			{ ...props }>
			<ModalContext value={ { titleId } }>
				<div className='modal-surface'>
					{ children }
				</div>
			</ModalContext>
			{ closable && (
				<button type='button' className='modal-close' aria-label={ closeLabel } onClick={ () => onClose?.() }>
					<svg viewBox='0 0 24 24' aria-hidden='true' focusable='false'>
						<path d='M6 6l12 12M18 6L6 18' fill='none' stroke='#fff' strokeWidth='2.75' strokeLinecap='round'/>
					</svg>
				</button>
			) }
		</dialog>
	);
};

/**
 * Modal dialog on the native `<dialog>` (backdrop, inert page behind it, Escape handling, top layer).
 * Controlled through `open` / `onClose`. Compose it with the namespaced parts:
 * `<Modal.Header>`, `<Modal.Content>` and `<Modal.Footer>` (all optional).
 * Every part forwards native attributes (`className`, `ref`, `aria-*`, …).
 */
export const IcapModal = Object.assign(ModalRoot, {
	Header : ModalHeader,
	Content: ModalContent,
	Footer : ModalFooter
});
