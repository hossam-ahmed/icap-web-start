import { useState } from "react";
import { IcapInput } from "@shared/components/IcapInput";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const inputProps: PropDoc[] = [
	{
		name       : "label",
		type       : "ReactNode",
		description: "Floating label inside the border. Rests in the middle while the field is empty and has no placeholder; floats to the top, smaller, on focus or once there's a value."
	},
	{
		name       : "placeholder",
		type       : "string",
		description: "Native placeholder. When set, the label stays at the top so both are visible."
	},
	{
		name       : "multiline",
		type       : "boolean",
		default    : "false",
		description: <>Renders a <InlineCode>&lt;textarea&gt;</InlineCode> (3 rows by default; resizable vertically) instead of an <InlineCode>&lt;input&gt;</InlineCode>.</>
	},
	{
		name       : "invalid",
		type       : "boolean",
		default    : "false",
		description: "Red border and label, e.g. from form validation."
	},
	{
		name       : "className / controlClassName",
		type       : "string",
		description: "Classes on the bordered wrapper / on the input or textarea. A text-* class on the wrapper scales the whole field."
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"input"> | ComponentProps<"textarea">`,
		description: <>Every native attribute (<InlineCode>value</InlineCode>, <InlineCode>defaultValue</InlineCode>, <InlineCode>onChange</InlineCode>,
			<InlineCode>name</InlineCode>, <InlineCode>type</InlineCode>, <InlineCode>rows</InlineCode>, <InlineCode>disabled</InlineCode>,
			<InlineCode>required</InlineCode>, <InlineCode>ref</InlineCode>, <InlineCode>aria-*</InlineCode>, …) goes to the control.</>
	}
];

export const IcapInputDocs = () => {
	const [name, setName] = useState("");

	return (
		<DocPage
			title='IcapInput'
			description={ <>A text field with a floating label inside its border: an <InlineCode>&lt;input&gt;</InlineCode> by default,
				or a <InlineCode>&lt;textarea&gt;</InlineCode> with <InlineCode>multiline</InlineCode>.</> }
			importCode={ `import { IcapInput } from "@shared/components/IcapInput";` }>

			<DocSection title='Floating label'>
				<Example
					title='Label only'
					description='Click the field: the label floats to the top. Leave it empty and click away: it returns.'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `<IcapInput label="Username" />` }>
					<IcapInput label='Username'/>
					<IcapInput label='Password' type='password'/>
				</Example>

				<Example
					title='With a value'
					description='The label stays at the top while there is a value.'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `<IcapInput label="Email" defaultValue="name@example.com" />` }>
					<IcapInput label='Email' defaultValue='name@example.com'/>
				</Example>

				<Example
					title='With a placeholder'
					description='The label stays at the top so the placeholder is visible underneath.'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `<IcapInput label="Phone number" placeholder="05xxxxxxxx" />` }>
					<IcapInput label='Phone number' placeholder='05xxxxxxxx' type='tel'/>
				</Example>

				<Example
					title='Without a label'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `<IcapInput placeholder="Search symbols" aria-label="Search symbols" />` }>
					<IcapInput placeholder='Search symbols' aria-label='Search symbols'/>
				</Example>
			</DocSection>

			<DocSection title='Textarea'>
				<Example
					title='multiline'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `
<IcapInput multiline label="Notes" />
<IcapInput multiline rows={4} label="Message" placeholder="Write your message…" />` }>
					<IcapInput multiline label='Notes'/>
					<IcapInput multiline rows={ 4 } label='Message' placeholder='Write your message…'/>
				</Example>
			</DocSection>

			<DocSection title='States & sizes'>
				<Example
					title='Controlled'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `
const [name, setName] = useState("");

<IcapInput label="Full name" value={name} onChange={e => setName(e.target.value)} />` }>
					<IcapInput label='Full name' value={ name } onChange={ e => setName(e.target.value) }/>
					<span className='text-sm'>value: { JSON.stringify(name) }</span>
				</Example>

				<Example
					title='Invalid & disabled'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `
<IcapInput label="National ID" invalid defaultValue="123" />
<IcapInput label="Account number" disabled defaultValue="3001" />` }>
					<IcapInput label='National ID' invalid defaultValue='123'/>
					<IcapInput label='Account number' disabled defaultValue='3001'/>
				</Example>

				<Example
					title='Font-size classes'
					description='Everything is in em, so a text-* class on the field scales the text, label, padding and height.'
					contentClassName='flex flex-col gap-4 max-w-md'
					code={ `
<IcapInput className="text-xs" label="Small" />
<IcapInput className="text-lg" label="Large" />` }>
					<IcapInput className='text-xs' label='Small'/>
					<IcapInput className='text-lg' label='Large'/>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ inputProps }/>
				<Callout>
					The label position is pure CSS (focus and <InlineCode>:placeholder-shown</InlineCode>), so it follows controlled,
					uncontrolled, react-hook-form <InlineCode>register()</InlineCode> and browser-autofilled values alike.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
