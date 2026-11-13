import { useState } from "react";
import { IcapButton } from "@shared/components/IcapButton";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const buttonProps: PropDoc[] = [
	{
		name       : "variant",
		type       : `"primary" | "secondary" | "alternate" | "transparent"`,
		default    : `"primary"`,
		description: "Visual style of the button. Added as a CSS class next to `icap-button`."
	},
	{
		name       : "outlined",
		type       : "boolean",
		default    : "false",
		description: "Transparent background with a border in the variant's color."
	},
	{
		name       : "type",
		type       : `"button" | "submit" | "reset"`,
		default    : `"button"`,
		description: <>Defaults to <InlineCode>button</InlineCode> (not the browser default <InlineCode>submit</InlineCode>), so it never submits a form by accident.</>
	},
	{
		name       : "className",
		type       : "string",
		description: "Extra classes appended after the variant class (Tailwind utilities work)."
	},
	{
		name       : "children",
		type       : "ReactNode",
		description: "Button content — text, icons, or both."
	}
];

export const ButtonDocs = () => {
	const [count, setCount] = useState(0);

	return (
		<DocPage
			title='IcapButton'
			description={ <>A thin wrapper around the native <InlineCode>&lt;button&gt;</InlineCode> that applies the app's
				design tokens. Every native button attribute (<InlineCode>onClick</InlineCode>, <InlineCode>disabled</InlineCode>,
				<InlineCode>aria-*</InlineCode>, …) is forwarded.</> }
			importCode={ `import { IcapButton } from "@shared/components/IcapButton";` }>

			<DocSection title='Variants'>
				<Example
					title='Primary, secondary, alternate & transparent'
					code={ `
<IcapButton variant="primary">Primary</IcapButton>
<IcapButton variant="secondary">Secondary</IcapButton>
<IcapButton variant="alternate">Alternate</IcapButton>
<IcapButton variant="transparent">Transparent</IcapButton>` }>
					<IcapButton variant='primary'>Primary</IcapButton>
					<IcapButton variant='secondary'>Secondary</IcapButton>
					<IcapButton variant='alternate'>Alternate</IcapButton>
					<IcapButton variant='transparent'>Transparent</IcapButton>
				</Example>

				<Example
					title='Outlined'
					code={ `
<IcapButton variant="primary" outlined>Primary</IcapButton>
<IcapButton variant="secondary" outlined>Secondary</IcapButton>
<IcapButton variant="alternate" outlined>Alternate</IcapButton>
<IcapButton variant="transparent" outlined>Transparent</IcapButton>
<IcapButton outlined disabled>Disabled</IcapButton>` }>
					<IcapButton variant='primary' outlined>Primary</IcapButton>
					<IcapButton variant='secondary' outlined>Secondary</IcapButton>
					<IcapButton variant='alternate' outlined>Alternate</IcapButton>
					<IcapButton variant='transparent' outlined>Transparent</IcapButton>
					<IcapButton outlined disabled>Disabled</IcapButton>
				</Example>
			</DocSection>

			<DocSection title='States'>
				<Example
					title='Disabled'
					description='Uses the native disabled attribute; styling switches to primary-200.'
					code={ `<IcapButton disabled>Disabled</IcapButton>` }>
					<IcapButton disabled>Disabled</IcapButton>
				</Example>
			</DocSection>

			<DocSection title='Handling events'>
				<Example
					title='onClick'
					code={ `
const [count, setCount] = useState(0);

<IcapButton onClick={() => setCount(c => c + 1)}>
  Clicked {count} times
</IcapButton>` }>
					<IcapButton onClick={ () => setCount(c => c + 1) }>Clicked { count } times</IcapButton>
				</Example>

				<Example
					title='Inside a form'
					description='Pass type="submit" explicitly when the button should submit.'
					code={ `
<form onSubmit={(e) => { e.preventDefault(); /* ... */ }}>
  <IcapButton type="submit">Save</IcapButton>
  <IcapButton type="reset" variant="secondary">Reset</IcapButton>
</form>` }>
					<form className='flex gap-4' onSubmit={ e => {
						e.preventDefault();
						alert("Submitted!");
					} }>
						<IcapButton type='submit'>Save</IcapButton>
						<IcapButton type='reset' variant='secondary'>Reset</IcapButton>
					</form>
				</Example>
			</DocSection>

			<DocSection title='Customizing'>
				<Example
					title='Extra classes'
					description='className is appended, so Tailwind utilities can extend the base styles.'
					code={ `<IcapButton className="w-full font-semibold">Full width</IcapButton>` }>
					<IcapButton className='w-full font-semibold'>Full width</IcapButton>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable
					props={ buttonProps }
					note={ <>Also accepts every prop of <InlineCode>ComponentProps&lt;"button"&gt;</InlineCode>.</> }/>
				<Callout type='warning'>
					The <InlineCode>secondary</InlineCode> variant currently has the same styles as <InlineCode>primary</InlineCode> in <InlineCode>IcapButton.css</InlineCode>.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
