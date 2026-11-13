import {
	Children,
	type ComponentProps,
	createContext,
	isValidElement,
	type KeyboardEvent,
	type ReactElement,
	type ReactNode,
	startTransition,
	use,
	useId,
	useState,
	ViewTransition
} from "react";
import "./IcapTabGroup.css";

/* ---------------------------------------------------------------- types */

export type TabsGroupProps = Omit<ComponentProps<"div">, "defaultValue" | "onChange"> & {
	/** Selected tab value (controlled). */
	value?: string;
	/** Initially selected tab value (uncontrolled). Default: the first enabled tab. */
	defaultValue?: string;
	/** Called with the new value when the user selects a tab. */
	onValueChange?: (value: string) => void;
	/** Accessible name of the tab list, when there's no visible heading for it. */
	"aria-label"?: string;
	/** `<Tab>` elements. */
	children?: ReactNode;
};

export type TabProps = {
	/** Identifies the tab. Default: its index (`"0"`, `"1"`, …). */
	value?: string;
	/** Disables the trigger; the tab can't be selected. */
	disabled?: boolean;
	/** One `<Tab.Trigger>` and one `<Tab.Content>`. */
	children?: ReactNode;
};

export type TabTriggerProps = Omit<ComponentProps<"button">, "type" | "role">;
export type TabContentProps = ComponentProps<"div">;

/* -------------------------------------------------------------- context */

type TabContextValue = {
	value: string;
	selected: boolean;
	disabled: boolean;
	triggerId: string;
	panelId: string;
	/** Shared view-transition name of the active underline, unique per group. */
	indicatorName: string;
	select: () => void;
};

const TabContext = createContext<TabContextValue | null>(null);

const useTab = (part: string) => {
	const ctx = use(TabContext);
	if (!ctx) throw new Error(`<Tab.${ part }> must be rendered inside <Tab> within <TabsGroup>.`);
	return ctx;
};

/* ---------------------------------------------------------------- parts */

const TabTrigger = ({ className = "", children, onClick, ...props }: TabTriggerProps) => {
	const { selected, disabled, triggerId, panelId, indicatorName, select } = useTab("Trigger");

	return (
		<button
			type='button'
			role='tab'
			id={ triggerId }
			aria-selected={ selected }
			aria-controls={ panelId }
			tabIndex={ selected ? 0 : -1 }
			disabled={ disabled }
			className={ `tab-trigger ${ className }` }
			onClick={ e => {
				onClick?.(e);
				if (!e.defaultPrevented) select();
			} }
			{ ...props }>
			{ children }
			{/* Only the active trigger renders the underline; sharing one name makes it slide between tabs */ }
			{ selected && (
				<ViewTransition name={ indicatorName }>
					<span className='tab-indicator' aria-hidden='true'/>
				</ViewTransition>
			) }
		</button>
	);
};

const TabContent = ({ className = "", ...props }: TabContentProps) => {
	const { triggerId, panelId } = useTab("Content");
	return (
		<div
			role='tabpanel'
			id={ panelId }
			aria-labelledby={ triggerId }
			tabIndex={ 0 }
			className={ `tab-content ${ className }` }
			{ ...props }/>
	);
};

/** Marker component: `<TabsGroup>` reads its props and places its trigger and content. */
const TabRoot = (_props: TabProps) => null;

/* ---------------------------------------------------------------- group */

type ParsedTab = {
	value: string;
	disabled: boolean;
	trigger?: ReactElement;
	content?: ReactElement;
};

const findPart = (children: ReactNode, type: unknown) =>
	Children.toArray(children).find((c): c is ReactElement => isValidElement(c) && c.type === type);

const parseTabs = (children: ReactNode): ParsedTab[] =>
	Children.toArray(children)
		.filter((c): c is ReactElement<TabProps> => isValidElement(c) && c.type === TabRoot)
		.map((tab, index) => ({
			value   : tab.props.value ?? String(index),
			disabled: !!tab.props.disabled,
			trigger : findPart(tab.props.children, TabTrigger),
			content : findPart(tab.props.children, TabContent)
		}));

/**
 * Tabs, composed with namespaced parts:
 *
 * ```tsx
 * <TabsGroup defaultValue="overview">
 *   <Tab value="overview">
 *     <Tab.Trigger>Overview</Tab.Trigger>
 *     <Tab.Content>…</Tab.Content>
 *   </Tab>
 * </TabsGroup>
 * ```
 *
 * Triggers are laid out in one tab list and only the selected tab's content is rendered.
 * Switching tabs runs in a transition wrapped by `<ViewTransition>`, so the browser's default
 * cross-fade plays on the content and the underline slides to the new tab.
 * `<Tab>` must be a direct child of `<TabsGroup>`, and the parts direct children of `<Tab>`.
 */
export const IcapTabGroup = ({
	value,
	defaultValue,
	onValueChange,
	className = "",
	children,
	"aria-label": ariaLabel,
	...props
}: TabsGroupProps) => {
	const id = useId();
	const tabs = parseTabs(children);
	const enabled = tabs.filter(t => !t.disabled);

	const [internalValue, setInternalValue] = useState(defaultValue);
	const requested = value ?? internalValue;
	// Fall back to the first enabled tab if nothing (valid) is selected
	const active = tabs.find(t => t.value === requested && !t.disabled) ?? enabled[0];

	const select = (next: string) => {
		if (next === active?.value) return;
		startTransition(() => {
			if (value === undefined) setInternalValue(next);
			onValueChange?.(next);
		});
	};

	const ctxFor = (tab: ParsedTab, index: number): TabContextValue => ({
		value        : tab.value,
		selected     : tab === active,
		disabled     : tab.disabled,
		triggerId    : `${ id }-tab-${ index }`,
		panelId      : `${ id }-panel-${ index }`,
		indicatorName: `${ id }-tab-indicator`,
		select       : () => select(tab.value)
	});

	/* Arrow keys move between enabled tabs (mirrored in RTL), Home/End jump to the ends. */
	const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (!enabled.length) return;
		const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
		const current = enabled.findIndex(t => t === active);
		const step = { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 }[e.key];

		let nextIndex: number;
		if (step !== undefined) nextIndex = (current + step + enabled.length) % enabled.length;
		else if (e.key === "Home") nextIndex = 0;
		else if (e.key === "End") nextIndex = enabled.length - 1;
		else return;

		e.preventDefault();
		const next = enabled[nextIndex];
		select(next.value);
		document.getElementById(`${ id }-tab-${ tabs.indexOf(next) }`)?.focus();
	};

	return (
		<div className={ `icap-tabs ${ className }` } { ...props }>
			<div role='tablist' aria-label={ ariaLabel } className='tabs-list' onKeyDown={ onKeyDown }>
				{ tabs.map((tab, i) => (
					<TabContext key={ tab.value } value={ ctxFor(tab, i) }>
						{ tab.trigger }
					</TabContext>
				)) }
			</div>

			<ViewTransition>
				{ active?.content && (
					<TabContext key={ active.value } value={ ctxFor(active, tabs.indexOf(active)) }>
						{ active.content }
					</TabContext>
				) }
			</ViewTransition>
		</div>
	);
};

export const IcapTab = Object.assign(TabRoot, {
	Trigger: TabTrigger,
	Content: TabContent
});
