import { useState } from "react";
import { IcapOption, IcapSelect } from "@shared/components/IcapSelect";
import { IcapAmount } from "@shared/components/IcapAmount";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const selectProps: PropDoc[] = [
	{
		name       : "children",
		type       : "ReactNode",
		description: <><InlineCode>&lt;IcapOption&gt;</InlineCode> elements (directly, or as an array from <InlineCode>.map()</InlineCode>).</>
	},
	{
		name       : "value",
		type       : "string | null",
		description: "Selected value (controlled)."
	},
	{
		name       : "defaultValue",
		type       : "string | null",
		default    : "null",
		description: "Initially selected value (uncontrolled)."
	},
	{
		name       : "onChange",
		type       : "(value: string) => void",
		description: "Called when the user picks a different option."
	},
	{
		name       : "onBlur",
		type       : "(event) => void",
		description: "Called when focus leaves the select. For form libraries (touched state)."
	},
	{
		name       : "placeholder",
		type       : "ReactNode",
		description: "Shown in the trigger when nothing is selected."
	},
	{
		name       : "variant",
		type       : `"primary" | "secondary" | "alternate" | "transparent" (each also as "…-outlined")`,
		default    : `"alternate"`,
		description: <>Trigger style. The trigger is an <InlineCode>IcapButton</InlineCode>: the variant sets its color, and
			<InlineCode>-outlined</InlineCode> makes it outlined.</>
	},
	{
		name       : "name",
		type       : "string",
		description: "Adds a hidden input with the value, so native forms submit it."
	},
	{
		name       : "disabled / invalid",
		type       : "boolean",
		default    : "false",
		description: "Disables the select / shows the error border."
	},
	{
		name       : "className / triggerClassName",
		type       : "string",
		description: "Extra classes on the wrapper / on the trigger button. A text-* class on either scales the select."
	},
	{
		name       : "ref",
		type       : "Ref<HTMLButtonElement>",
		description: "The trigger button, so form libraries can focus the field on errors."
	}
];

const optionProps: PropDoc[] = [
	{
		name       : "value",
		type       : "string",
		required   : true,
		description: "The option's value."
	},
	{
		name       : "children",
		type       : "ReactNode",
		description: "The option's template: any content."
	},
	{
		name       : "label",
		type       : "ReactNode",
		default    : "children",
		description: "What the trigger shows when this option is selected (useful when the template is large)."
	},
	{
		name       : "disabled",
		type       : "boolean",
		description: "The option can't be selected."
	}
];

const sortOptions = [
	{ value: "amount", label: "Amount" },
	{ value: "date", label: "Date" },
	{ value: "name", label: "Name" }
];

export const IcapSelectDocs = () => {
	const [sort, setSort] = useState<string | null>("amount");

	return (
		<DocPage
			title='IcapSelect'
			description={ <>A custom select: a trigger that opens a floating list of <InlineCode>IcapOption</InlineCode>s. Options take any
				template as children. Picking an option closes the list; clicking outside or Escape closes it too. The list appears and
				disappears with <InlineCode>&lt;ViewTransition&gt;</InlineCode>.</> }
			importCode={ `import { IcapSelect, IcapOption } from "@shared/components/IcapSelect";` }>

			<DocSection title='Variants'>
				<Example
					title='Filled & outlined'
					code={ `
<IcapSelect variant="secondary" defaultValue="amount">…</IcapSelect>
<IcapSelect variant="primary" defaultValue="amount">…</IcapSelect>
<IcapSelect variant="alternate" defaultValue="amount">…</IcapSelect>
<IcapSelect variant="secondary-outlined" defaultValue="amount">…</IcapSelect>
<IcapSelect variant="primary-outlined" defaultValue="amount">…</IcapSelect>
<IcapSelect variant="alternate-outlined" defaultValue="amount">…</IcapSelect>` }>
					<div className='flex flex-wrap gap-3 pb-40'>
						{ (["secondary", "primary", "alternate", "transparent", "secondary-outlined", "primary-outlined", "alternate-outlined", "transparent-outlined"] as const).map(variant => (
							<IcapSelect key={ variant } variant={ variant } defaultValue='amount' aria-label='Sort by'>
								{ sortOptions.map(o => <IcapOption key={ o.value } value={ o.value }>{ o.label }</IcapOption>) }
							</IcapSelect>
						)) }
					</div>
				</Example>
			</DocSection>

			<DocSection title='Usage'>
				<Example
					title='Placeholder & controlled'
					code={ `
const [sort, setSort] = useState<string | null>("amount");

<IcapSelect placeholder="Sort by" value={sort} onChange={setSort}>
  <IcapOption value="amount">Amount</IcapOption>
  <IcapOption value="date">Date</IcapOption>
  <IcapOption value="name">Name</IcapOption>
</IcapSelect>` }>
					<div className='flex items-start gap-4 pb-40'>
						<IcapSelect placeholder='Sort by' value={ sort } onChange={ setSort }>
							{ sortOptions.map(o => <IcapOption key={ o.value } value={ o.value }>{ o.label }</IcapOption>) }
						</IcapSelect>
						<IcapSelect placeholder='Sort by' aria-label='Sort by'>
							{ sortOptions.map(o => <IcapOption key={ o.value } value={ o.value }>{ o.label }</IcapOption>) }
						</IcapSelect>
						<span className='text-sm pt-4'>value: { String(sort) }</span>
					</div>
				</Example>

				<Example
					title='Custom templates'
					description='Options take any content. Use label to show something shorter in the trigger.'
					code={ `
<IcapSelect placeholder="Order type" triggerClassName="w-64">
  <IcapOption value="market" label="Market">
    <div className="flex flex-col gap-1">
      <strong>Market</strong>
      <small className="text-neutral-500">Executes at the best available price</small>
    </div>
  </IcapOption>
  <IcapOption value="limit" label="Limit">…</IcapOption>
  <IcapOption value="stop" label="Stop" disabled>…</IcapOption>
</IcapSelect>` }>
					<div className='pb-56'>
						<IcapSelect placeholder='Order type' triggerClassName='w-64' variant='primary-outlined'>
							<IcapOption value='market' label='Market'>
								<div className='flex flex-col gap-1'>
									<strong>Market</strong>
									<small className='text-neutral-500'>Executes at the best available price</small>
								</div>
							</IcapOption>
							<IcapOption value='limit' label='Limit'>
								<div className='flex flex-col gap-1'>
									<strong>Limit</strong>
									<small className='text-neutral-500'>Executes at your price or better</small>
								</div>
							</IcapOption>
							<IcapOption value='stop' label='Stop' disabled>
								<div className='flex flex-col gap-1'>
									<strong>Stop</strong>
									<small className='text-neutral-500'>Not available for this market</small>
								</div>
							</IcapOption>
						</IcapSelect>
					</div>
				</Example>

				<Example
					title='Rich trigger content'
					description='Without label, the selected option template itself is shown in the trigger.'
					code={ `
<IcapSelect defaultValue="10k">
  <IcapOption value="10k"><IcapAmount amount={10000} decimals={0} /></IcapOption>
  <IcapOption value="50k"><IcapAmount amount={50000} decimals={0} /></IcapOption>
</IcapSelect>` }>
					<div className='pb-32'>
						<IcapSelect defaultValue='10k' aria-label='Amount'>
							<IcapOption value='10k'><IcapAmount amount={ 10000 } decimals={ 0 }/></IcapOption>
							<IcapOption value='50k'><IcapAmount amount={ 50000 } decimals={ 0 }/></IcapOption>
						</IcapSelect>
					</div>
				</Example>

				<Example
					title='Invalid & disabled'
					code={ `
<IcapSelect placeholder="Required" invalid>…</IcapSelect>
<IcapSelect defaultValue="date" disabled>…</IcapSelect>` }>
					<IcapSelect placeholder='Required' invalid aria-label='Sort by'>
						{ sortOptions.map(o => <IcapOption key={ o.value } value={ o.value }>{ o.label }</IcapOption>) }
					</IcapSelect>
					<IcapSelect defaultValue='date' disabled aria-label='Sort by'>
						{ sortOptions.map(o => <IcapOption key={ o.value } value={ o.value }>{ o.label }</IcapOption>) }
					</IcapSelect>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<h3 className='font-semibold mb-2'>IcapSelect</h3>
				<PropsTable props={ selectProps }/>
				<h3 className='font-semibold mt-4 mb-2'>IcapOption</h3>
				<PropsTable props={ optionProps }/>
				<Callout>
					Form-ready: <InlineCode>value</InlineCode>, <InlineCode>onChange</InlineCode>, <InlineCode>onBlur</InlineCode>,
					<InlineCode>name</InlineCode> and <InlineCode>ref</InlineCode> match a react-hook-form <InlineCode>Controller</InlineCode> field.
					<InlineCode>IcapOption</InlineCode> must be a direct child of <InlineCode>IcapSelect</InlineCode> (or inside an array from
					<InlineCode>.map()</InlineCode>). Arrow-key navigation inside the list is not implemented yet.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
