import { Amount } from "@shared/components/Amount";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const amountProps: PropDoc[] = [
	{
		name       : "amount",
		type       : "number",
		required   : true,
		description: "The value to display. Negative values get a leading minus before the currency icon."
	},
	{
		name       : "decimals",
		type       : "number",
		default    : "2",
		description: "Fixed number of decimal places (0–20). The value is rounded and padded with zeros to match."
	},
	{
		name       : "decimalSize",
		type       : "string",
		default    : "same as the amount",
		description: <>Font size of the decimal part only (the <InlineCode>.</InlineCode> and the fraction), as any CSS
			length. Use <InlineCode>em</InlineCode> (e.g. <InlineCode>"0.7em"</InlineCode>) to keep it relative to the
			amount's font size, or a fixed value like <InlineCode>"12px"</InlineCode>.</>
	},
	{
		name       : "className",
		type       : "string",
		description: "Extra classes on the wrapper. A text-* size class scales the icon (1.2em) and the number together; a text color class colors both."
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"span">`,
		description: <>Any other <InlineCode>&lt;span&gt;</InlineCode> attribute is forwarded to the wrapper.</>
	}
];

export const AmountDocs = () => (
	<DocPage
		title='Amount'
		description={ <>Displays a monetary value with the currency icon, thousand separators, and a fixed number of
			decimals. Formatting uses <InlineCode>Intl.NumberFormat("en-US")</InlineCode>.</> }
		importCode={ `import { Amount } from "@shared/components/Amount";` }>

		<DocSection title='Basic usage'>
			<Example title='Default (2 decimals)' code={ `<Amount amount={105257.213} />` }>
				<Amount amount={ 105257.213 }/>
			</Example>

			<Example
				title='Font size & color'
				description='Pass any text-* class: the icon and the number both scale relative to it, and they inherit the text color.'
				code={ `
<Amount amount={105257.21} className="text-sm" />
<Amount amount={105257.21} />
<Amount amount={105257.21} className="text-2xl" />
<Amount amount={105257.21} className="text-4xl text-secondary" />` }>
				<div className='flex flex-col items-start gap-4'>
					<Amount amount={ 105257.21 } className='text-sm'/>
					<Amount amount={ 105257.21 }/>
					<Amount amount={ 105257.21 } className='text-2xl'/>
					<Amount amount={ 105257.21 } className='text-4xl text-secondary'/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Decimals'>
			<Example
				title='Custom decimal places'
				code={ `
<Amount amount={1250} decimals={0} />
<Amount amount={1250} />
<Amount amount={1250.5} decimals={3} />` }>
				<Amount amount={ 1250 } decimals={ 0 }/>
				<Amount amount={ 1250 }/>
				<Amount amount={ 1250.5 } decimals={ 3 }/>
			</Example>
		</DocSection>

		<DocSection title='Decimal size'>
			<Example
				title='Smaller decimals'
				description='The decimal part is a separate element. It matches the amount size by default; decimalSize sets it independently.'
				code={ `
<Amount amount={105257.21} className="text-3xl" />
<Amount amount={105257.21} className="text-3xl" decimalSize="0.6em" />
<Amount amount={105257.21} className="text-3xl" decimalSize="14px" />` }>
				<div className='flex flex-col items-start gap-4'>
					<Amount amount={ 105257.21 } className='text-3xl'/>
					<Amount amount={ 105257.21 } className='text-3xl' decimalSize='0.6em'/>
					<Amount amount={ 105257.21 } className='text-3xl' decimalSize='14px'/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Negative values'>
			<Example title='Below zero' code={ `<Amount amount={-4820.75} />` }>
				<Amount amount={ -4820.75 }/>
			</Example>
		</DocSection>

		<DocSection title='Props'>
			<PropsTable props={ amountProps }/>
			<Callout>
				The wrapper is forced to <InlineCode>dir="ltr"</InlineCode> so the icon stays before the number in
				Arabic layouts too. The icon has <InlineCode>aria-label="SAR"</InlineCode> for screen readers.
			</Callout>
		</DocSection>
	</DocPage>
);
