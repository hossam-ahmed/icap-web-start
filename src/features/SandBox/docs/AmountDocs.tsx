import { useState } from "react";
import { IcapAmount } from "@shared/components/IcapAmount";
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
		name       : "showCurrency",
		type       : "boolean",
		default    : "true",
		description: "Shows the currency icon before the number."
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

const editableProps: PropDoc[] = [
	{
		name       : "editable",
		type       : "true",
		required   : true,
		description: "Renders an input instead of text."
	},
	{
		name       : "amount",
		type       : "number | null",
		description: "Current amount (controlled). null = empty."
	},
	{
		name       : "defaultAmount",
		type       : "number | null",
		description: "Initial amount (uncontrolled)."
	},
	{
		name       : "onAmountChange",
		type       : "(amount: number | null) => void",
		description: "Called with the parsed amount on every edit (null when empty or incomplete)."
	},
	{
		name       : "variant",
		type       : `"field" | "flat"`,
		default    : `"field"`,
		description: <><InlineCode>field</InlineCode>: a regular form field with the icon inside. <InlineCode>flat</InlineCode>: no border
			or background, reads like the display amount.</>
	},
	{
		name       : "decimals",
		type       : "number",
		default    : "2",
		description: "Maximum decimal places the user can type. When not focused the value is padded to this many places."
	},
	{
		name       : "allowNegative",
		type       : "boolean",
		default    : "false",
		description: "Allows a leading minus sign."
	},
	{
		name       : "className / style",
		type       : "string / CSSProperties",
		description: "On the wrapper. A text-* class scales the icon, the input's font, width and height together."
	},
	{
		name       : "inputClassName",
		type       : "string",
		description: <>Class on the <InlineCode>&lt;input&gt;</InlineCode> itself.</>
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"input">`,
		description: <>Every other native input attribute (<InlineCode>name</InlineCode>, <InlineCode>placeholder</InlineCode>,
			<InlineCode>disabled</InlineCode>, <InlineCode>ref</InlineCode>, <InlineCode>onBlur</InlineCode>, <InlineCode>aria-*</InlineCode>, …)
			is forwarded to the input.</>
	}
];

const EditableExamples = () => {
	const [value, setValue] = useState<number | null>(1250000);

	return (
		<DocSection title='Editable'>
			<Example
				title='Field & flat'
				description='Shows separators when not focused and the plain number while typing.'
				code={ `
<IcapAmount editable defaultAmount={1500} placeholder="0.00" />
<IcapAmount editable variant="flat" defaultAmount={98765.4} />` }>
				<IcapAmount editable defaultAmount={ 1500 } placeholder='0.00' aria-label='IcapAmount'/>
				<IcapAmount editable variant='flat' defaultAmount={ 98765.4 } aria-label='IcapAmount'/>
			</Example>

			<Example
				title='Font-size classes'
				description='The icon, font, width and height scale together.'
				code={ `
<IcapAmount editable className="text-sm" defaultAmount={1234567.89} />
<IcapAmount editable className="text-2xl" defaultAmount={1234567.89} />
<IcapAmount editable variant="flat" className="text-4xl" defaultAmount={1234567.89} />` }>
				<div className='flex flex-col items-start gap-3'>
					<IcapAmount editable className='text-sm' defaultAmount={ 1234567.89 } aria-label='IcapAmount'/>
					<IcapAmount editable className='text-2xl' defaultAmount={ 1234567.89 } aria-label='IcapAmount'/>
					<IcapAmount editable variant='flat' className='text-4xl' defaultAmount={ 1234567.89 } aria-label='IcapAmount'/>
				</div>
			</Example>

			<Example
				title='Controlled'
				code={ `
const [value, setValue] = useState<number | null>(1250000);

<IcapAmount editable amount={value} onAmountChange={setValue} decimals={0} />` }>
				<div className='flex items-center gap-4'>
					<IcapAmount editable amount={ value } onAmountChange={ setValue } decimals={ 0 } aria-label='IcapAmount'/>
					<span className='text-sm'>value: { String(value) }</span>
				</div>
			</Example>

			<Example title='Disabled' code={ `<IcapAmount editable disabled defaultAmount={500} />` }>
				<IcapAmount editable disabled defaultAmount={ 500 } aria-label='IcapAmount'/>
			</Example>
		</DocSection>
	);
};

export const AmountDocs = () => (
	<DocPage
		title='IcapAmount'
		description={ <>Displays a monetary value with the currency icon, thousand separators, and a fixed number of
			decimals. Formatting uses <InlineCode>Intl.NumberFormat("en-US")</InlineCode>. With <InlineCode>editable</InlineCode> it
			becomes an amount input (<InlineCode>field</InlineCode> or <InlineCode>flat</InlineCode>).</> }
		importCode={ `import { useState } from "react";
import { IcapAmount } from "@shared/components/IcapAmount";` }>

		<DocSection title='Basic usage'>
			<Example title='Default (2 decimals)' code={ `<IcapAmount amount={105257.213} />` }>
				<IcapAmount amount={ 105257.213 }/>
			</Example>

			<Example
				title='Font size & color'
				description='Pass any text-* class: the icon and the number both scale relative to it, and they inherit the text color.'
				code={ `
<IcapAmount amount={105257.21} className="text-sm" />
<IcapAmount amount={105257.21} />
<IcapAmount amount={105257.21} className="text-2xl" />
<IcapAmount amount={105257.21} className="text-4xl text-secondary" />` }>
				<div className='flex flex-col items-start gap-4'>
					<IcapAmount amount={ 105257.21 } className='text-sm'/>
					<IcapAmount amount={ 105257.21 }/>
					<IcapAmount amount={ 105257.21 } className='text-2xl'/>
					<IcapAmount amount={ 105257.21 } className='text-4xl text-secondary'/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Decimals'>
			<Example
				title='Custom decimal places'
				code={ `
<IcapAmount amount={1250} decimals={0} />
<IcapAmount amount={1250} />
<IcapAmount amount={1250.5} decimals={3} />` }>
				<IcapAmount amount={ 1250 } decimals={ 0 }/>
				<IcapAmount amount={ 1250 }/>
				<IcapAmount amount={ 1250.5 } decimals={ 3 }/>
			</Example>
		</DocSection>

		<DocSection title='Decimal size'>
			<Example
				title='Smaller decimals'
				description='The decimal part is a separate element. It matches the amount size by default; decimalSize sets it independently.'
				code={ `
<IcapAmount amount={105257.21} className="text-3xl" />
<IcapAmount amount={105257.21} className="text-3xl" decimalSize="0.6em" />
<IcapAmount amount={105257.21} className="text-3xl" decimalSize="14px" />` }>
				<div className='flex flex-col items-start gap-4'>
					<IcapAmount amount={ 105257.21 } className='text-3xl'/>
					<IcapAmount amount={ 105257.21 } className='text-3xl' decimalSize='0.6em'/>
					<IcapAmount amount={ 105257.21 } className='text-3xl' decimalSize='14px'/>
				</div>
			</Example>
		</DocSection>

		<DocSection title='Negative values'>
			<Example title='Below zero' code={ `<IcapAmount amount={-4820.75} />` }>
				<IcapAmount amount={ -4820.75 }/>
			</Example>
		</DocSection>

		<EditableExamples/>

		<DocSection title='Props'>
			<h3 className='font-semibold mb-2'>Display</h3>
			<PropsTable props={ amountProps }/>
			<h3 className='font-semibold mt-4 mb-2'>Editable</h3>
			<PropsTable props={ editableProps }/>
			<Callout>
				The wrapper is forced to <InlineCode>dir="ltr"</InlineCode> so the icon stays before the number in
				Arabic layouts too. The icon has <InlineCode>aria-label="SAR"</InlineCode> for screen readers.
			</Callout>
		</DocSection>
	</DocPage>
);
