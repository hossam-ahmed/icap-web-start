/**
 * TEMPLATE — copy this file to document a new shared component.
 *
 * 1. Copy to `docs/<Name>Docs.tsx` and rename `TemplateDocs` → `<Name>Docs`.
 * 2. Replace the import, description, examples and props below.
 * 3. Register it in `docs/registry.ts`.
 *
 * Keep each Example's `code` string in sync with its rendered children.
 */
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";
// import { MyComponent } from "@shared/components/MyComponent";

const componentProps: PropDoc[] = [
	{
		name       : "exampleProp",
		type       : `"a" | "b"`,
		default    : `"a"`,
		description: "What this prop does."
	},
	{
		name       : "requiredProp",
		type       : "string",
		required   : true,
		description: "Mark required props with `required: true`."
	}
];

export const TemplateDocs = () => (
	<DocPage
		title='MyComponent'
		description={ <>One or two sentences: what it is and when to use it.</> }
		importCode={ `import { MyComponent } from "@shared/components/MyComponent";` }>

		<DocSection title='Basic usage'>
			<Example title='Default' code={ `<MyComponent requiredProp="value" />` }>
				{/* <MyComponent requiredProp="value" /> */ }
				<span>Live preview goes here</span>
			</Example>
		</DocSection>

		<DocSection title='Variants' description='One Example per meaningful variation.'>
			<Example title='Variant b' code={ `<MyComponent exampleProp="b" requiredProp="value" />` }>
				<span>Live preview goes here</span>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ componentProps } note={ <>Also accepts all native <InlineCode>div</InlineCode> props.</> }/>
			<Callout>Tips, gotchas, or related components.</Callout>
		</DocSection>
	</DocPage>
);
