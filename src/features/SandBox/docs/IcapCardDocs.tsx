import { IcapCard } from "@shared/components/IcapCard";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const cardProps: PropDoc[] = [
	{
		name       : "children",
		type       : "ReactNode",
		description: <>Card body. Usually a mix of <InlineCode>IcapCard.Header</InlineCode>, <InlineCode>IcapCard.Content</InlineCode>
			and <InlineCode>IcapCard.Footer</InlineCode>, but any content works.</>
	},
	{
		name       : "className",
		type       : "string",
		description: <>Appended to the element. Use it to override the background, padding, width, etc.</>
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"div">`,
		description: <>Every native div attribute (<InlineCode>ref</InlineCode>, <InlineCode>onClick</InlineCode>,
			<InlineCode>aria-*</InlineCode>, …) is forwarded. Applies to <InlineCode>IcapCard</InlineCode> and all of its parts.</>
	}
];

const headerProps: PropDoc[] = [
	{
		name       : "bordered",
		type       : "boolean",
		default    : "false",
		description: <>Adds a 1px solid bottom border in <InlineCode>border-color-primary</InlineCode> under the header.</>
	}
];

export const IcapCardDocs = () => (
	<DocPage
		title='IcapCard'
		description={ <>A white container with the default border radius, composed with namespaced parts:
			<InlineCode>IcapCard.Header</InlineCode>, <InlineCode>IcapCard.Content</InlineCode> and <InlineCode>IcapCard.Footer</InlineCode>.</> }
		importCode={ `import { IcapCard } from "@shared/components/IcapCard";` }>

		<DocSection title='Usage'>
			<Example
				title='Header, content & footer'
				code={ `
<IcapCard>
  <IcapCard.Header>Portfolio</IcapCard.Header>
  <IcapCard.Content>Your holdings summary goes here.</IcapCard.Content>
  <IcapCard.Footer>Updated 5 minutes ago</IcapCard.Footer>
</IcapCard>` }>
				<IcapCard className='w-80'>
					<IcapCard.Header>Portfolio</IcapCard.Header>
					<IcapCard.Content>Your holdings summary goes here.</IcapCard.Content>
					<IcapCard.Footer>Updated 5 minutes ago</IcapCard.Footer>
				</IcapCard>
			</Example>

			<Example
				title='Content only'
				description='Every part is optional.'
				code={ `
<IcapCard>
  <IcapCard.Content>Just a body.</IcapCard.Content>
</IcapCard>` }>
				<IcapCard className='w-80'>
					<IcapCard.Content>Just a body.</IcapCard.Content>
				</IcapCard>
			</Example>

			<Example
				title='Footer with a background'
				contentClassName='icap-bg'
				description='The footer is rounded on the bottom with the same radius as the card, so its background follows the corners.'
				code={ `
<IcapCard>
  <IcapCard.Header>Order</IcapCard.Header>
  <IcapCard.Content>Buy 100 shares</IcapCard.Content>
  <IcapCard.Footer className="bg-primary-100">Pending</IcapCard.Footer>
</IcapCard>` }>
				<IcapCard className='w-100'>
					<IcapCard.Header>Order</IcapCard.Header>
					<IcapCard.Content>Buy 100 shares</IcapCard.Content>
					<IcapCard.Footer className='bg-primary-100'>Pending</IcapCard.Footer>
				</IcapCard>
			</Example>

			<Example
				title='Bordered header'
				description='Pass bordered to separate the header from the content with a bottom border.'
				code={ `
<IcapCard>
  <IcapCard.Header bordered>Portfolio</IcapCard.Header>
  <IcapCard.Content>Your holdings summary goes here.</IcapCard.Content>
</IcapCard>` }>
				<IcapCard className='w-80'>
					<IcapCard.Header bordered>Portfolio</IcapCard.Header>
					<IcapCard.Content>Your holdings summary goes here.</IcapCard.Content>
				</IcapCard>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ cardProps }/>
			<h3 className='font-semibold mt-4 mb-2'>IcapCard.Header</h3>
			<PropsTable props={ headerProps }/>
			<Callout>
				Styles live in <InlineCode>IcapCard.css</InlineCode> under <InlineCode>.icap-card</InlineCode>, with
				<InlineCode>.card-header</InlineCode>, <InlineCode>.card-content</InlineCode> and <InlineCode>.card-footer</InlineCode> for the parts.
			</Callout>
		</DocSection>
	</DocPage>
);
