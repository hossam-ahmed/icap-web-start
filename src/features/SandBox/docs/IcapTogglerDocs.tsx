import { useState } from "react";
import { IcapToggler } from "@shared/components/IcapToggler";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const togglerProps: PropDoc[] = [
	{
		name       : "variant",
		type       : `"primary" | "secondary" | "alternate"`,
		default    : `"primary"`,
		description: "Color of the track when on."
	},
	{
		name       : "tooltip",
		type       : "ReactNode",
		description: "Shown when the switch is hovered or focused with the keyboard. Also read by screen readers as the switch's description."
	},
	{
		name       : "tooltipPlacement",
		type       : `"top" | "bottom"`,
		default    : `"top"`,
		description: "Where the tooltip appears."
	},
	{
		name       : "children",
		type       : "ReactNode",
		description: "Optional label next to the switch. Clicking it toggles the switch."
	},
	{
		name       : "className",
		type       : "string",
		description: <>Appended to the native <InlineCode>&lt;input&gt;</InlineCode> (the track).</>
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"input">`,
		description: <>Every native input attribute (<InlineCode>checked</InlineCode>, <InlineCode>defaultChecked</InlineCode>,
			<InlineCode>onChange</InlineCode>, <InlineCode>name</InlineCode>, <InlineCode>disabled</InlineCode>, <InlineCode>ref</InlineCode>,
			<InlineCode>aria-*</InlineCode>, …) is forwarded. It's a checkbox with <InlineCode>role="switch"</InlineCode>.</>
	}
];

export const IcapTogglerDocs = () => {
	const [on, setOn] = useState(true);

	return (
		<DocPage
			title='IcapToggler'
			description={ <>An on/off switch built on a native checkbox with <InlineCode>role="switch"</InlineCode>, so forms,
				keyboard (Space) and screen readers work as usual.</> }
			importCode={ `import { IcapToggler } from "@shared/components/IcapToggler";` }>

			<DocSection title='Variants'>
				<Example
					title='Primary, secondary & alternate'
					code={ `
<IcapToggler variant="primary" defaultChecked aria-label="Notifications" />
<IcapToggler variant="secondary" defaultChecked aria-label="Notifications" />
<IcapToggler variant="alternate" defaultChecked aria-label="Notifications" />
<IcapToggler aria-label="Notifications" />` }>
					<IcapToggler variant='primary' defaultChecked aria-label='Notifications'/>
					<IcapToggler variant='secondary' defaultChecked aria-label='Notifications'/>
					<IcapToggler variant='alternate' defaultChecked aria-label='Notifications'/>
					<IcapToggler aria-label='Notifications'/>
				</Example>

				<Example
					title='With label'
					code={ `<IcapToggler defaultChecked>Price alerts</IcapToggler>` }>
					<IcapToggler defaultChecked>Price alerts</IcapToggler>
				</Example>
			</DocSection>

			<DocSection title='Tooltip'>
				<Example
					title='Top & bottom'
					description='Hover the switch, or Tab to it.'
					code={ `
<IcapToggler tooltip="Show prices in SAR" aria-label="Currency" />
<IcapToggler tooltip="Dark mode" tooltipPlacement="bottom" aria-label="Theme" />` }>
					<div className='flex gap-10 py-8'>
						<IcapToggler tooltip='Show prices in SAR' aria-label='Currency'/>
						<IcapToggler tooltip='Dark mode' tooltipPlacement='bottom' aria-label='Theme'/>
					</div>
				</Example>
			</DocSection>

			<DocSection title='Size & states'>
				<Example
					title='Font-size classes'
					description='The switch is sized in em, so a text-* class on it or a parent scales it.'
					code={ `
<div className="text-xs"><IcapToggler defaultChecked /></div>
<div className="text-3xl"><IcapToggler defaultChecked /></div>` }>
					<div className='flex items-center gap-6'>
						<div className='text-xs'><IcapToggler defaultChecked aria-label='Small'/></div>
						<IcapToggler defaultChecked aria-label='Default'/>
						<div className='text-3xl'><IcapToggler defaultChecked aria-label='Large'/></div>
					</div>
				</Example>

				<Example
					title='Disabled'
					code={ `
<IcapToggler disabled>Off</IcapToggler>
<IcapToggler disabled defaultChecked>On</IcapToggler>` }>
					<IcapToggler disabled>Off</IcapToggler>
					<IcapToggler disabled defaultChecked>On</IcapToggler>
				</Example>

				<Example
					title='Controlled'
					code={ `
const [on, setOn] = useState(true);

<IcapToggler checked={on} onChange={e => setOn(e.target.checked)}>
  Notifications ({on ? "on" : "off"})
</IcapToggler>` }>
					<IcapToggler checked={ on } onChange={ e => setOn(e.target.checked) }>
						Notifications ({ on ? "on" : "off" })
					</IcapToggler>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ togglerProps }/>
				<Callout>
					Without a visible label, pass <InlineCode>aria-label</InlineCode> so the switch has an accessible name.
					The thumb slides with the writing direction, so it's mirrored in Arabic.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
