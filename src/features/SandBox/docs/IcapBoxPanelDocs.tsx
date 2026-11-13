import { IcapBoxPanel } from "@shared/components/IcapBoxPanel";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const boxPanelProps: PropDoc[] = [
	{
		name       : "children",
		type       : "ReactNode",
		description: "Panel content."
	},
	{
		name       : "className",
		type       : "string",
		description: "Extra classes. The panel has no padding or layout of its own, so add them here (e.g. p-4, flex, gap-3). Utility classes override the default background, radius and border."
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"div">`,
		description: <>Every native div attribute (<InlineCode>ref</InlineCode>, <InlineCode>onClick</InlineCode>, <InlineCode>role</InlineCode>,
			<InlineCode>aria-*</InlineCode>, …) is forwarded.</>
	}
];

export const IcapBoxPanelDocs = () => (
	<DocPage
		title='IcapBoxPanel'
		description={ <>A plain container box: white background, the default border radius and a 1px
			<InlineCode>border-color-primary</InlineCode> border. Use it to group content when you don't need the header, content
			and footer parts of <InlineCode>IcapCard</InlineCode>.</> }
		importCode={ `import { IcapBoxPanel } from "@shared/components/IcapBoxPanel";` }>

		<DocSection title='Usage'>
			<Example
				title='Basic'
				description='No built-in padding: add it with className.'
				code={ `<IcapBoxPanel className="p-4">Available balance: 12,500 SAR</IcapBoxPanel>` }>
				<IcapBoxPanel className='p-4'>Available balance: 12,500 SAR</IcapBoxPanel>
			</Example>

			<Example
				title='Layout'
				code={ `
<IcapBoxPanel className="p-4 flex items-center justify-between gap-4 w-80">
  <span>Buying power</span>
  <strong>48,200 SAR</strong>
</IcapBoxPanel>` }>
				<IcapBoxPanel className='p-4 flex items-center justify-between gap-4 w-80'>
					<span>Buying power</span>
					<strong>48,200 SAR</strong>
				</IcapBoxPanel>
			</Example>

			<Example
				title='Overriding the defaults'
				description='Utility classes win over the default background, radius and border.'
				code={ `
<IcapBoxPanel className="p-4 bg-primary-50">Tinted background</IcapBoxPanel>
<IcapBoxPanel className="p-4 rounded-md">Smaller radius</IcapBoxPanel>
<IcapBoxPanel className="p-4 border-secondary">Secondary border</IcapBoxPanel>` }>
				<IcapBoxPanel className='p-4 bg-primary-50'>Tinted background</IcapBoxPanel>
				<IcapBoxPanel className='p-4 rounded-md'>Smaller radius</IcapBoxPanel>
				<IcapBoxPanel className='p-4 border-secondary'>Secondary border</IcapBoxPanel>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ boxPanelProps }/>
			<Callout>
				Styles live in <InlineCode>IcapBoxPanel.css</InlineCode> under <InlineCode>.icap-box-panel</InlineCode>
				(<InlineCode>bg-white rounded-default border-default</InlineCode>).
			</Callout>
		</DocSection>
	</DocPage>
);
