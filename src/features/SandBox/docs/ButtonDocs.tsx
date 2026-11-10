import { useState } from "react";
import { Button } from "@shared/components/Button";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const buttonProps: PropDoc[] = [
	{
		name       : "variant",
		type       : `"primary" | "secondary"`,
		default    : `"primary"`,
		description: "Visual style of the button. Added as a CSS class next to `icap-button`."
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
			title='Button'
			description={ <>A thin wrapper around the native <InlineCode>&lt;button&gt;</InlineCode> that applies the app's
				design tokens. Every native button attribute (<InlineCode>onClick</InlineCode>, <InlineCode>disabled</InlineCode>,
				<InlineCode>aria-*</InlineCode>, …) is forwarded.</> }
			importCode={ `import { Button } from "@shared/components/Button";` }>

			<DocSection title='Variants'>
				<Example
					title='Primary & secondary'
					code={ `
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>` }>
					<Button variant='primary'>Primary</Button>
					<Button variant='secondary'>Secondary</Button>
				</Example>
			</DocSection>

			<DocSection title='States'>
				<Example
					title='Disabled'
					description='Uses the native disabled attribute; styling switches to primary-200.'
					code={ `<Button disabled>Disabled</Button>` }>
					<Button disabled>Disabled</Button>
				</Example>
			</DocSection>

			<DocSection title='Handling events'>
				<Example
					title='onClick'
					code={ `
const [count, setCount] = useState(0);

<Button onClick={() => setCount(c => c + 1)}>
  Clicked {count} times
</Button>` }>
					<Button onClick={ () => setCount(c => c + 1) }>Clicked { count } times</Button>
				</Example>

				<Example
					title='Inside a form'
					description='Pass type="submit" explicitly when the button should submit.'
					code={ `
<form onSubmit={(e) => { e.preventDefault(); /* ... */ }}>
  <Button type="submit">Save</Button>
  <Button type="reset" variant="secondary">Reset</Button>
</form>` }>
					<form className='flex gap-4' onSubmit={ e => {
						e.preventDefault();
						alert("Submitted!");
					} }>
						<Button type='submit'>Save</Button>
						<Button type='reset' variant='secondary'>Reset</Button>
					</form>
				</Example>
			</DocSection>

			<DocSection title='Customizing'>
				<Example
					title='Extra classes'
					description='className is appended, so Tailwind utilities can extend the base styles.'
					code={ `<Button className="w-full text-white font-semibold">Full width</Button>` }>
					<Button className='w-full text-white font-semibold'>Full width</Button>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable
					props={ buttonProps }
					note={ <>Also accepts every prop of <InlineCode>ComponentProps&lt;"button"&gt;</InlineCode>.</> }/>
				<Callout type='warning'>
					The <InlineCode>secondary</InlineCode> variant currently has the same styles as <InlineCode>primary</InlineCode> in <InlineCode>Button.css</InlineCode>.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
