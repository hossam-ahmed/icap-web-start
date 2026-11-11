import { Divider } from "@shared/components/Divider";
import { Callout, DocPage, DocSection, Example, InlineCode } from "../doc-kit/DocKit.tsx";

export const DividerDocs = () => (
	<DocPage
		title='Divider'
		description={ <>A decorative horizontal rule in the brand's copper tone. It fills the full width of its parent and
			fades out at both ends, so it works well to separate sections or groups of content.</> }
		importCode={ `import { Divider } from "@shared/components/Divider";` }>

		<DocSection title='Basic usage'>
			<Example title='Default' code={ `<Divider />` }>
				<div className='w-full'>
					<Divider/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Layout'>
			<Example
				title='Between content'
				description='Use it to separate blocks of content; spacing comes from the parent layout.'
				code={ `
<div className="flex flex-col gap-4">
  <p>First section</p>
  <Divider />
  <p>Second section</p>
</div>` }>
				<div className='flex flex-col gap-4 w-full'>
					<p>First section</p>
					<Divider/>
					<p>Second section</p>
				</div>
			</Example>

			<Example
				title='Constrained width'
				description='The divider is 100% wide, so wrap it to control its length.'
				code={ `
<div className="w-1/2 mx-auto">
  <Divider />
</div>` }>
				<div className='w-1/2 mx-auto'>
					<Divider/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<Callout>
				<InlineCode>Divider</InlineCode> takes no props. Its look (3px height, copper gradient, faded edges) is defined
				in <InlineCode>Divider.css</InlineCode> under <InlineCode>.decorative-divider</InlineCode>.
			</Callout>
		</DocSection>
	</DocPage>
);
