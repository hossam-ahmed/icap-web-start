import { useState } from "react";
import { IcapRadio } from "@shared/components/IcapRadio";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const radioProps: PropDoc[] = [
	{
		name       : "variant",
		type       : `"primary" | "secondary"`,
		default    : `"primary"`,
		description: "Color of the ring."
	},
	{
		name       : "children",
		type       : "ReactNode",
		description: "Optional label shown next to the radio. It is wrapped in the same <label>, so clicking it selects the radio."
	},
	{
		name       : "className",
		type       : "string",
		description: <>Appended to the native <InlineCode>&lt;input&gt;</InlineCode> (the ring itself).</>
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"input">`,
		description: <>Every native input attribute (<InlineCode>name</InlineCode>, <InlineCode>value</InlineCode>,
			<InlineCode>checked</InlineCode>, <InlineCode>defaultChecked</InlineCode>, <InlineCode>onChange</InlineCode>,
			<InlineCode>disabled</InlineCode>, <InlineCode>required</InlineCode>, <InlineCode>ref</InlineCode>,
			<InlineCode>aria-*</InlineCode>, …) is forwarded. <InlineCode>type</InlineCode> is always <InlineCode>radio</InlineCode>.</>
	}
];

const plans = ["Basic", "Pro", "Enterprise"];

export const IcapRadioDocs = () => {
	const [plan, setPlan] = useState("Pro");

	return (
		<DocPage
			title='IcapRadio'
			description={ <>A styled native <InlineCode>&lt;input type="radio"&gt;</InlineCode> in a donut style: a thin
				ring that thickens into a solid band when selected. Radios sharing a <InlineCode>name</InlineCode> form a
				group, with native arrow-key navigation.</> }
			importCode={ `import { IcapRadio } from "@shared/components/IcapRadio";` }>

			<DocSection title='Variants'>
				<Example
					title='Primary & secondary'
					code={ `
<IcapRadio name="primary-demo" defaultChecked>Selected</IcapRadio>
<IcapRadio name="primary-demo">Unselected</IcapRadio>

<IcapRadio variant="secondary" name="secondary-demo" defaultChecked>Selected</IcapRadio>
<IcapRadio variant="secondary" name="secondary-demo">Unselected</IcapRadio>` }>
					<div className='flex flex-col gap-3'>
						<IcapRadio name='primary-demo' defaultChecked>Selected</IcapRadio>
						<IcapRadio name='primary-demo'>Unselected</IcapRadio>
					</div>
					<div className='flex flex-col gap-3'>
						<IcapRadio variant='secondary' name='secondary-demo' defaultChecked>Selected</IcapRadio>
						<IcapRadio variant='secondary' name='secondary-demo'>Unselected</IcapRadio>
					</div>
				</Example>
			</DocSection>

			<DocSection title='States'>
				<Example
					title='Disabled'
					description='Uses the native disabled attribute.'
					code={ `
<IcapRadio name="disabled-demo" disabled>Disabled</IcapRadio>
<IcapRadio name="disabled-demo" disabled defaultChecked>Disabled selected</IcapRadio>` }>
					<IcapRadio name='disabled-demo' disabled>Disabled</IcapRadio>
					<IcapRadio name='disabled-demo' disabled defaultChecked>Disabled selected</IcapRadio>
				</Example>
			</DocSection>

			<DocSection title='Controlled group'>
				<Example
					title='checked + onChange'
					description='Share a name so the radios behave as one group (one selection, arrow-key navigation).'
					code={ `
const [plan, setPlan] = useState("Pro");

<div role="radiogroup" aria-label="Plan">
  {["Basic", "Pro", "Enterprise"].map(p => (
    <IcapRadio key={p} name="plan" value={p}
               checked={plan === p}
               onChange={e => setPlan(e.target.value)}>
      {p}
    </IcapRadio>
  ))}
</div>` }>
					<div role='radiogroup' aria-label='Plan' className='flex flex-col gap-3'>
						{ plans.map(p => (
							<IcapRadio key={ p } name='plan' value={ p }
							           checked={ plan === p }
							           onChange={ e => setPlan(e.target.value) }>
								{ p }
							</IcapRadio>
						)) }
						<span className='text-sm'>Selected: { plan }</span>
					</div>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ radioProps }/>
				<Callout>
					Styles live in <InlineCode>IcapRadio.css</InlineCode> under <InlineCode>.icap-radio</InlineCode>,
					with <InlineCode>.primary</InlineCode> / <InlineCode>.secondary</InlineCode> modifiers on the label. The donut
					is the input's own border animating from 2px to 6px when checked.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
