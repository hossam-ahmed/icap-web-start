import { useState } from "react";
import { type IcapAccount, IcapAccountSelector } from "@shared/components/IcapAccountSelector";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const accounts: IcapAccount[] = [
	{ id: "3001", name: "Saudi", currency: "SAR", number: "3001", balance: 20000 },
	{ id: "3002", name: "United States", currency: "USD", number: "3002", balance: 20000 }
];

const selectorProps: PropDoc[] = [
	{
		name       : "accounts",
		type       : "IcapAccount[]",
		required   : true,
		description: <>Accounts to choose from: <InlineCode>{ "{ id, name, currency, number, balance, image?, disabled? }" }</InlineCode>.
			SAR balances use the riyal icon; other currencies show the code after the amount.</>
	},
	{
		name       : "value",
		type       : "string | null",
		description: "Selected account id (controlled)."
	},
	{
		name       : "defaultValue",
		type       : "string | null",
		default    : "null",
		description: "Initially selected account id (uncontrolled)."
	},
	{
		name       : "onChange",
		type       : "(value: string, account: IcapAccount) => void",
		description: "Called when the user picks a different account."
	},
	{
		name       : "onBlur",
		type       : "(event) => void",
		description: "Called when focus leaves the selector. For form libraries (touched state)."
	},
	{
		name       : "name",
		type       : "string",
		description: "Adds a hidden input with the selected id, so native forms submit it."
	},
	{
		name       : "label / badge",
		type       : "ReactNode",
		description: <>Caption (e.g. <InlineCode>"To"</InlineCode>) and tag (e.g. <InlineCode>"SIB Capital"</InlineCode>) at the top of the header.</>
	},
	{
		name       : "placeholder",
		type       : "ReactNode",
		default    : `"Select an account"`,
		description: "Shown in the header when nothing is selected."
	},
	{
		name       : "balanceLabel",
		type       : "ReactNode",
		default    : `"Available balance:"`,
		description: "Text before the balance (translate it for Arabic)."
	},
	{
		name       : "disabled / invalid",
		type       : "boolean",
		default    : "false",
		description: "Disables the selector / shows the error border."
	},
	{
		name       : "ref",
		type       : "Ref<HTMLButtonElement>",
		description: "The header button, so form libraries can focus the field on errors."
	},
	{
		name       : "className",
		type       : "string",
		description: "Extra classes on the wrapper."
	}
];

export const IcapAccountSelectorDocs = () => {
	const [account, setAccount] = useState<string | null>("3001");

	return (
		<DocPage
			title='IcapAccountSelector'
			description={ <>A dropdown for picking an account. Click the header to open the list; picking an account selects it and
				closes the list, and clicking outside closes it too. The list appears and disappears with React's
				<InlineCode>&lt;ViewTransition&gt;</InlineCode>.</> }
			importCode={ `import { IcapAccountSelector, type IcapAccount } from "@shared/components/IcapAccountSelector";` }>

			<DocSection title='Usage'>
				<Example
					title='Controlled'
					code={ `
const accounts: IcapAccount[] = [
  { id: "3001", name: "Saudi", currency: "SAR", number: "3001", balance: 20000, image: saudiFlag },
  { id: "3002", name: "United States", currency: "USD", number: "3002", balance: 20000, image: usFlag }
];
const [account, setAccount] = useState<string | null>("3001");

<IcapAccountSelector
  accounts={accounts}
  value={account}
  onChange={setAccount}
  label="To"
  badge="SIB Capital"
/>` }>
					<div className='flex flex-col gap-3 w-full max-w-xl'>
						<IcapAccountSelector accounts={ accounts } value={ account } onChange={ setAccount } label='To' badge='SIB Capital'/>
						<span className='text-sm'>value: { String(account) }</span>
					</div>
				</Example>

				<Example
					title='Nothing selected'
					code={ `<IcapAccountSelector accounts={accounts} label="From" placeholder="Choose the account to transfer from" />` }>
					<div className='w-full max-w-xl'>
						<IcapAccountSelector accounts={ accounts } label='From' placeholder='Choose the account to transfer from'/>
					</div>
				</Example>

				<Example
					title='Invalid & disabled'
					code={ `
<IcapAccountSelector accounts={accounts} label="To" invalid />
<IcapAccountSelector accounts={accounts} label="To" defaultValue="3002" disabled />` }>
					<div className='flex flex-col gap-4 w-full max-w-xl'>
						<IcapAccountSelector accounts={ accounts } label='To' invalid/>
						<IcapAccountSelector accounts={ accounts } label='To' defaultValue='3002' disabled/>
					</div>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ selectorProps }/>
				<Callout>
					Built to plug into a form library later: <InlineCode>value</InlineCode>, <InlineCode>onChange</InlineCode>,
					<InlineCode>onBlur</InlineCode>, <InlineCode>name</InlineCode> and <InlineCode>ref</InlineCode> match a react-hook-form
					<InlineCode>Controller</InlineCode> field, and <InlineCode>invalid</InlineCode> takes <InlineCode>fieldState.invalid</InlineCode>.
					Keyboard navigation inside the list is not implemented yet. Without an <InlineCode>image</InlineCode>, the circle shows the
					currency code.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
