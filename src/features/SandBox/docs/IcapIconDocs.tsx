import { IcapIcon } from "@shared/components/IcapIcon";
import { Button } from "@shared/components/Button";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const iconProps: PropDoc[] = [
	{
		name       : "icon",
		type       : "IcapIconName",
		required   : true,
		description: <>File name without extension, e.g. <InlineCode>"loader"</InlineCode> → <InlineCode>src/assets/icons/loader.svg</InlineCode>.</>
	},
	{
		name       : "size",
		type       : "string",
		default    : `"24px"`,
		description: "Any CSS length; applied to both width and height."
	},
	{
		name       : "color",
		type       : "string",
		default    : "currentColor",
		description: "Tint color — hex, rgb(), or a CSS variable. Defaults to the parent's text color."
	},
	{
		name       : "parentPath",
		type       : "string",
		default    : `"icons"`,
		description: <>Folder under <InlineCode>src/assets</InlineCode> containing the icon.</>
	},
	{
		name       : "extension",
		type       : "string",
		default    : `"svg"`,
		description: "File extension (svg, png, jpg, jpeg, webp, gif)."
	},
	{
		name       : "aria-label",
		type       : "string",
		description: <>When set, the icon gets <InlineCode>role="img"</InlineCode>; otherwise it is treated as decorative (<InlineCode>aria-hidden</InlineCode>).</>
	}
];

export const IcapIconDocs = () => (
	<DocPage
		title='IcapIcon'
		description={ <>Renders any image from <InlineCode>src/assets</InlineCode> as a tintable icon. The image is used as a
			CSS mask over a solid color, so a single-color SVG can take any color without editing the file.</> }
		importCode={ `import { IcapIcon } from "@shared/components/IcapIcon";` }>

		<DocSection title='Basic usage'>
			<Example title='Default' code={ `<IcapIcon icon="loader" />` }>
				<IcapIcon icon='loader'/>
			</Example>
		</DocSection>

		<DocSection title='Sizes'>
			<Example
				title='size prop'
				code={ `
<IcapIcon icon="loader" size="16px" />
<IcapIcon icon="loader" size="24px" />
<IcapIcon icon="loader" size="40px" />
<IcapIcon icon="loader" size="3rem" />` }>
				<IcapIcon icon='loader' size='16px'/>
				<IcapIcon icon='loader' size='24px'/>
				<IcapIcon icon='loader' size='40px'/>
				<IcapIcon icon='loader' size='3rem'/>
			</Example>
		</DocSection>

		<DocSection title='Colors'>
			<Example
				title='Explicit color'
				code={ `
<IcapIcon icon="loader" size="32px" color="#e11d48" />
<IcapIcon icon="loader" size="32px" color="var(--color-primary)" />
<IcapIcon icon="loader" size="32px" color="rgb(22 163 74)" />` }>
				<IcapIcon icon='loader' size='32px' color='#e11d48'/>
				<IcapIcon icon='loader' size='32px' color='var(--color-primary)'/>
				<IcapIcon icon='loader' size='32px' color='rgb(22 163 74)'/>
			</Example>

			<Example
				title='Inherit from text color'
				description='With no color prop the icon uses currentColor, so Tailwind text-* classes on a parent work.'
				code={ `
<span className="text-primary-700">
  <IcapIcon icon="loader" size="32px" />
</span>` }>
				<span className='text-primary-700'><IcapIcon icon='loader' size='32px'/></span>
				<span className='text-amber-500'><IcapIcon icon='loader' size='32px'/></span>
			</Example>
		</DocSection>

		<DocSection title='Composition'>
			<Example
				title='Icon inside a Button'
				code={ `
<Button className="flex items-center gap-2">
  <IcapIcon icon="loader" size="18px" />
  Refresh
</Button>` }>
				<Button className='flex items-center justify-center gap-2'>
					<IcapIcon icon='loader' size='18px'/>
					Refresh
				</Button>
			</Example>

			<Example
				title='Accessible (meaningful) icon'
				description='Add aria-label when the icon conveys meaning without surrounding text.'
				code={ `<IcapIcon icon="loader" aria-label="Loading" />` }>
				<IcapIcon icon='loader' aria-label='Loading'/>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable
				props={ iconProps }
				note={ <>Also accepts every prop of <InlineCode>ComponentProps&lt;"span"&gt;</InlineCode> (except the native <InlineCode>color</InlineCode>). <InlineCode>style</InlineCode> is merged last and can override anything.</> }/>
			<Callout>
				Adding an icon: drop the file into <InlineCode>src/assets/icons</InlineCode> and reference it by name.
				Run <InlineCode>npm run generate-icons</InlineCode> (also runs with <InlineCode>npm run dev</InlineCode>) to refresh the
				generated icon name list. A missing file logs a warning in dev.
			</Callout>
		</DocSection>
	</DocPage>
);
