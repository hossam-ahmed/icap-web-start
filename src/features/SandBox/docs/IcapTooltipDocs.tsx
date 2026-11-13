import { IcapTooltip } from "@shared/components/IcapTooltip";
import { IcapButton } from "@shared/components/IcapButton";
import { IcapIcon } from "@shared/components/IcapIcon";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const tooltipProps: PropDoc[] = [
	{
		name       : "content",
		type       : "ReactNode",
		required   : true,
		description: "Tooltip content. When empty, only the trigger is rendered."
	},
	{
		name       : "children",
		type       : "ReactNode",
		required   : true,
		description: "The trigger: hovering it or focusing it with the keyboard shows the tooltip."
	},
	{
		name       : "placement",
		type       : `"top" | "bottom" | "start" | "end"`,
		default    : `"top"`,
		description: "Preferred side. Flips to the opposite side when there's no room. start/end follow the text direction."
	},
	{
		name       : "delay",
		type       : "number",
		default    : "150",
		description: "Delay before showing, in ms."
	},
	{
		name       : "describeChild",
		type       : "boolean",
		default    : "true",
		description: <>Adds <InlineCode>aria-describedby</InlineCode> to the trigger element. Turn off when you set it on a nested
			element yourself (with <InlineCode>id</InlineCode>).</>
	},
	{
		name       : "id",
		type       : "string",
		default    : "generated",
		description: "Id of the tooltip element."
	},
	{
		name       : "className / triggerClassName",
		type       : "string",
		description: "Extra classes on the bubble / on the trigger wrapper."
	}
];

export const IcapTooltipDocs = () => (
	<DocPage
		title='IcapTooltip'
		description={ <>Shows a small bubble while the trigger is hovered or focused with the keyboard; Escape hides it. The bubble
			is rendered in the browser's top layer, so it's never clipped by <InlineCode>overflow: hidden</InlineCode> parents or modals.</> }
		importCode={ `import { IcapTooltip } from "@shared/components/IcapTooltip";` }>

		<DocSection title='Usage'>
			<Example
				title='Placements'
				description='Hover a button, or Tab to it.'
				code={ `
<IcapTooltip content="Shown on top"><IcapButton>Top</IcapButton></IcapTooltip>
<IcapTooltip content="Shown below" placement="bottom"><IcapButton>Bottom</IcapButton></IcapTooltip>
<IcapTooltip content="Start side" placement="start"><IcapButton>Start</IcapButton></IcapTooltip>
<IcapTooltip content="End side" placement="end"><IcapButton>End</IcapButton></IcapTooltip>` }>
				<div className='flex flex-wrap gap-4 py-6'>
					<IcapTooltip content='Shown on top'><IcapButton>Top</IcapButton></IcapTooltip>
					<IcapTooltip content='Shown below' placement='bottom'><IcapButton>Bottom</IcapButton></IcapTooltip>
					<IcapTooltip content='Start side' placement='start'><IcapButton>Start</IcapButton></IcapTooltip>
					<IcapTooltip content='End side'
					             placement='end'><IcapButton>End</IcapButton></IcapTooltip>
				</div>
			</Example>

			<Example
				title='On an icon'
				description='Give icon-only triggers an accessible name too.'
				code={ `
<IcapTooltip content="Notifications">
  <button aria-label="Notifications"><IcapIcon icon="notifications" /></button>
</IcapTooltip>` }>
				<IcapTooltip content='Notifications'>
					<button type='button' aria-label='Notifications' className='p-2 bg-transparent border-0'>
						<IcapIcon icon='notifications'/>
					</button>
				</IcapTooltip>
			</Example>

			<Example
				title='Long content'
				description='Wraps at 18rem.'
				code={ `<IcapTooltip content="Margin lending lets you borrow against your portfolio to buy more shares. Interest applies daily.">…</IcapTooltip>` }>
				<IcapTooltip content='Margin lending lets you borrow against your portfolio to buy more shares. Interest applies daily.'>
					<span className='underline decoration-dotted cursor-help' tabIndex={ 0 }>What is margin lending?</span>
				</IcapTooltip>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ tooltipProps }/>
			<Callout>
				The trigger is wrapped in an inline <InlineCode>span</InlineCode>. Tooltips only show for keyboard focus, not for mouse
				clicks. Non-focusable triggers (plain text) need <InlineCode>tabIndex=&#123;0&#125;</InlineCode> to be reachable by keyboard.
			</Callout>
		</DocSection>
	</DocPage>
);
