import {
	cloneElement,
	type CSSProperties,
	type FocusEvent,
	isValidElement,
	type ReactElement,
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState
} from "react";
import "./IcapTooltip.css";

export type IcapTooltipPlacement = "top" | "bottom" | "start" | "end";

export type IcapTooltipProps = {
	/** Tooltip text/content. When empty, only the trigger is rendered. */
	content: ReactNode;
	/** The element that shows the tooltip on hover or keyboard focus. */
	children: ReactNode;
	/** Preferred side; flips to the opposite side when there's no room. `start`/`end` follow the text direction. Default: `"top"`. */
	placement?: IcapTooltipPlacement;
	/** Delay before showing, in ms. Default: 150. */
	delay?: number;
	/**
	 * Adds `aria-describedby` to the trigger element so screen readers read the tooltip.
	 * Turn off when you set it yourself on a nested element (use `id`). Default: `true`.
	 */
	describeChild?: boolean;
	/** Id of the tooltip element (default: generated). Use it for your own `aria-describedby`. */
	id?: string;
	/** Extra classes on the tooltip bubble. */
	className?: string;
	/** Extra classes on the trigger wrapper. */
	triggerClassName?: string;
};

/** Distance between the trigger and the bubble, and minimum distance from the viewport edge. */
const GAP = 8;
const EDGE = 8;

type Side = "top" | "bottom" | "left" | "right";
type Position = { top: number; left: number; side: Side; arrow: number };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));

const computePosition = (anchor: DOMRect, tip: DOMRect, placement: IcapTooltipPlacement, rtl: boolean): Position => {
	const vw = window.innerWidth, vh = window.innerHeight;
	const physical: Side = placement === "start" ? (rtl ? "right" : "left")
		: placement === "end" ? (rtl ? "left" : "right")
			: placement;

	// Flip when the preferred side doesn't fit and the opposite side does
	const fits: Record<Side, boolean> = {
		top   : anchor.top - tip.height - GAP >= EDGE,
		bottom: anchor.bottom + tip.height + GAP <= vh - EDGE,
		left  : anchor.left - tip.width - GAP >= EDGE,
		right : anchor.right + tip.width + GAP <= vw - EDGE
	};
	const opposite: Record<Side, Side> = { top: "bottom", bottom: "top", left: "right", right: "left" };
	const side = !fits[physical] && fits[opposite[physical]] ? opposite[physical] : physical;

	if (side === "top" || side === "bottom") {
		const left = clamp(anchor.left + anchor.width / 2 - tip.width / 2, EDGE, vw - tip.width - EDGE);
		const top = side === "top" ? anchor.top - tip.height - GAP : anchor.bottom + GAP;
		// Arrow points at the anchor's center even when the bubble is pushed in from the edge
		return { top, left, side, arrow: clamp(anchor.left + anchor.width / 2 - left, 10, tip.width - 10) };
	}
	const top = clamp(anchor.top + anchor.height / 2 - tip.height / 2, EDGE, vh - tip.height - EDGE);
	const left = side === "left" ? anchor.left - tip.width - GAP : anchor.right + GAP;
	return { top, left, side, arrow: clamp(anchor.top + anchor.height / 2 - top, 10, tip.height - 10) };
};

/**
 * Shows `content` in a small bubble while the trigger is hovered or focused with the keyboard.
 * Escape hides it.
 *
 * The bubble lives in the browser's top layer (popover API), so it's never clipped by
 * `overflow: hidden` parents, modals or stacking contexts, and it flips to the other side
 * when there's no room.
 *
 * ```tsx
 * <IcapTooltip content="Refresh prices">
 *   <IcapButton>↻</IcapButton>
 * </IcapTooltip>
 * ```
 */
export const IcapTooltip = ({
	content,
	children,
	placement = "top",
	delay = 150,
	describeChild = true,
	id,
	className = "",
	triggerClassName = ""
}: IcapTooltipProps) => {
	const generatedId = useId();
	const tooltipId = id ?? `${ generatedId }-tooltip`;
	const triggerRef = useRef<HTMLSpanElement>(null);
	const tipRef = useRef<HTMLSpanElement>(null);
	const timer = useRef<number | undefined>(undefined);
	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState<Position | null>(null);

	const show = useCallback(() => {
		window.clearTimeout(timer.current);
		timer.current = window.setTimeout(() => setOpen(true), delay);
	}, [delay]);

	const hide = useCallback(() => {
		window.clearTimeout(timer.current);
		setOpen(false);
	}, []);

	const updatePosition = useCallback(() => {
		const trigger = triggerRef.current, tip = tipRef.current;
		if (!trigger || !tip) return;
		const rtl = getComputedStyle(trigger).direction === "rtl";
		setPosition(computePosition(trigger.getBoundingClientRect(), tip.getBoundingClientRect(), placement, rtl));
	}, [placement]);

	// Open/close the popover and place it before paint
	useLayoutEffect(() => {
		const tip = tipRef.current;
		if (!tip) return;
		if (open) {
			if (!tip.matches(":popover-open")) tip.showPopover?.();
			updatePosition();
		} else if (tip.matches(":popover-open")) {
			tip.hidePopover?.();
		}
	}, [open, updatePosition]);

	// While open: follow scroll/resize, close on Escape
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && hide();
		window.addEventListener("scroll", updatePosition, true);
		window.addEventListener("resize", updatePosition);
		document.addEventListener("keydown", onKey);
		return () => {
			window.removeEventListener("scroll", updatePosition, true);
			window.removeEventListener("resize", updatePosition);
			document.removeEventListener("keydown", onKey);
		};
	}, [open, updatePosition, hide]);

	useEffect(() => () => window.clearTimeout(timer.current), []);

	if (content === null || content === undefined || content === "" || content === false) return <>{ children }</>;

	// Keyboard focus only; a mouse click focusing the element shouldn't pop the tooltip
	const onFocus = (e: FocusEvent) => {
		if ((e.target as Element).matches?.(":focus-visible")) show();
	};

	// Link the trigger to the tooltip for screen readers
	const trigger = describeChild && isValidElement<{ "aria-describedby"?: string }>(children)
		? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
			"aria-describedby": [children.props["aria-describedby"], tooltipId].filter(Boolean).join(" ")
		})
		: children;

	return (
		<span
			ref={ triggerRef }
			className={ `icap-tooltip-trigger ${ triggerClassName }` }
			onMouseEnter={ show }
			onMouseLeave={ hide }
			onFocus={ onFocus }
			onBlur={ hide }>
			{ trigger }
			<span
				ref={ tipRef }
				id={ tooltipId }
				role='tooltip'
				popover='manual'
				className={ `icap-tooltip ${ position?.side ?? "top" } ${ className }` }
				style={ position ? {
					top        : position.top,
					left       : position.left,
					"--tooltip-arrow": `${ position.arrow }px`
				} as CSSProperties : undefined }>
				{ content }
			</span>
		</span>
	);
};
