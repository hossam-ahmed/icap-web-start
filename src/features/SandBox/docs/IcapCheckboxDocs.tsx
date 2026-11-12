import { useState } from "react";
import { IcapCheckbox } from "@shared/components/IcapCheckbox";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const checkboxProps: PropDoc[] = [
	{
		name       : "variant",
		type       : `"primary" | "secondary"`,
		default    : `"primary"`,
		description: "Color scheme of the box and check mark."
	},
	{
		name       : "children",
		type       : "ReactNode",
		description: "Optional label shown next to the box. It is wrapped in the same <label>, so clicking it toggles the checkbox."
	},
	{
		name       : "className",
		type       : "string",
		description: <>Appended to the native <InlineCode>&lt;input&gt;</InlineCode> (the box itself).</>
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"input">`,
		description: <>Every native input attribute (<InlineCode>checked</InlineCode>, <InlineCode>defaultChecked</InlineCode>,
			<InlineCode>onChange</InlineCode>, <InlineCode>name</InlineCode>, <InlineCode>value</InlineCode>,
			<InlineCode>disabled</InlineCode>, <InlineCode>required</InlineCode>, <InlineCode>ref</InlineCode>,
			<InlineCode>aria-*</InlineCode>, …) is forwarded. <InlineCode>type</InlineCode> is always <InlineCode>checkbox</InlineCode>.</>
	}
];

export const IcapCheckboxDocs = () => {
	const [accepted, setAccepted] = useState(false);

	return (
		<DocPage
			title='IcapCheckbox'
			description={ <>A styled native <InlineCode>&lt;input type="checkbox"&gt;</InlineCode>. The real input is kept in the
				DOM, so forms, keyboard focus, and screen readers work as usual.</> }
			importCode={ `import { IcapCheckbox } from "@shared/components/IcapCheckbox";` }>

			<DocSection title='Variants'>
				<Example
					title='Primary & secondary'
					code={ `
<IcapCheckbox variant="primary" defaultChecked>Primary</IcapCheckbox>
<IcapCheckbox variant="secondary" defaultChecked>Secondary</IcapCheckbox>` }>
					<IcapCheckbox variant='primary' defaultChecked>Primary</IcapCheckbox>
					<IcapCheckbox variant='secondary' defaultChecked>Secondary</IcapCheckbox>
				</Example>

				<Example
					title='Without a label'
					description='Pass aria-label so the checkbox still has an accessible name.'
					code={ `<IcapCheckbox aria-label="Select row" />` }>
					<IcapCheckbox aria-label='Select row'/>
					<IcapCheckbox variant='secondary' aria-label='Select row' defaultChecked/>
				</Example>
			</DocSection>

			<DocSection title='States'>
				<Example
					title='Disabled'
					description='Uses the native disabled attribute.'
					code={ `
<IcapCheckbox disabled>Disabled</IcapCheckbox>
<IcapCheckbox disabled defaultChecked>Disabled checked</IcapCheckbox>` }>
					<IcapCheckbox disabled>Disabled</IcapCheckbox>
					<IcapCheckbox disabled defaultChecked>Disabled checked</IcapCheckbox>
				</Example>
			</DocSection>

			<DocSection title='Controlled'>
				<Example
					title='checked + onChange'
					code={ `
const [accepted, setAccepted] = useState(false);

<IcapCheckbox checked={accepted} onChange={e => setAccepted(e.target.checked)}>
  I accept the terms ({accepted ? "yes" : "no"})
</IcapCheckbox>` }>
					<IcapCheckbox checked={ accepted } onChange={ e => setAccepted(e.target.checked) }>
						I accept the terms ({ accepted ? "yes" : "no" })
					</IcapCheckbox>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ checkboxProps }/>
				<Callout>
					Styles live in <InlineCode>IcapCheckbox.css</InlineCode> under <InlineCode>.icap-checkbox</InlineCode>,
					with <InlineCode>.primary</InlineCode> / <InlineCode>.secondary</InlineCode> modifiers on the label.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
