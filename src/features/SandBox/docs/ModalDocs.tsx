import { useState } from "react";
import { IcapModal } from "@shared/components/IcapModal";
import { IcapButton } from "@shared/components/IcapButton";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const modalProps: PropDoc[] = [
	{
		name       : "open",
		type       : "boolean",
		description: "Whether the modal is shown (controlled)."
	},
	{
		name       : "onClose",
		type       : "() => void",
		description: "Called when the user asks to close: close button, Escape key or backdrop click. Set open to false here."
	},
	{
		name       : "closable",
		type       : "boolean",
		default    : "false",
		description: "Shows the × close button in the top corner."
	},
	{
		name       : "closeLabel",
		type       : "string",
		default    : `"Close"`,
		description: "Accessible label of the close button."
	},
	{
		name       : "closeOnBackdropClick",
		type       : "boolean",
		default    : "true",
		description: "Close when clicking outside the modal."
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"dialog">`,
		description: <>Forwarded to the native <InlineCode>&lt;dialog&gt;</InlineCode> (<InlineCode>className</InlineCode>,
			<InlineCode>ref</InlineCode>, <InlineCode>aria-*</InlineCode>, …). Use <InlineCode>className</InlineCode> to change the width,
			e.g. <InlineCode>w-[40rem]</InlineCode>.</>
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

export const ModalDocs = () => {
	const [basicOpen, setBasicOpen] = useState(false);
	const [plainOpen, setPlainOpen] = useState(false);
	const [longOpen, setLongOpen] = useState(false);

	return (
		<DocPage
			title='IcapModal'
			description={ <>A modal dialog built on the native <InlineCode>&lt;dialog&gt;</InlineCode> (backdrop, page behind it made inert, Escape),
				composed with <InlineCode>IcapModal.Header</InlineCode>, <InlineCode>IcapModal.Content</InlineCode> and <InlineCode>IcapModal.Footer</InlineCode>.</> }
			importCode={ `import { IcapModal } from "@shared/components/IcapModal";` }>

			<DocSection title='Usage'>
				<Example
					title='With close button'
					code={ `
const [open, setOpen] = useState(false);

<IcapButton onClick={() => setOpen(true)}>Open modal</IcapButton>

<IcapModal open={open} onClose={() => setOpen(false)} closable>
  <IcapModal.Header bordered>Confirm order</IcapModal.Header>
  <IcapModal.Content>Buy 100 shares of 2222 at market price?</IcapModal.Content>
  <IcapModal.Footer>
    <IcapButton variant="secondary" onClick={() => setOpen(false)}>Cancel</IcapButton>
    <IcapButton onClick={() => setOpen(false)}>Confirm</IcapButton>
  </IcapModal.Footer>
</IcapModal>` }>
					<IcapButton onClick={ () => setBasicOpen(true) }>Open modal</IcapButton>
					<IcapModal open={ basicOpen } onClose={ () => setBasicOpen(false) } closable>
						<IcapModal.Header bordered>Confirm order</IcapModal.Header>
						<IcapModal.Content>Buy 100 shares of 2222 at market price?</IcapModal.Content>
						<IcapModal.Footer>
							<IcapButton variant='secondary' onClick={ () => setBasicOpen(false) }>Cancel</IcapButton>
							<IcapButton onClick={ () => setBasicOpen(false) }>Confirm</IcapButton>
						</IcapModal.Footer>
					</IcapModal>
				</Example>

				<Example
					title='Without close button'
					description='Closes with the footer button or Escape only; backdrop clicks are ignored.'
					code={ `
<IcapModal open={open} onClose={() => setOpen(false)} closeOnBackdropClick={false}>
  <IcapModal.Header>Session expired</IcapModal.Header>
  <IcapModal.Content>Please log in again.</IcapModal.Content>
  <IcapModal.Footer>
    <IcapButton onClick={() => setOpen(false)}>OK</IcapButton>
  </IcapModal.Footer>
</IcapModal>` }>
					<IcapButton onClick={ () => setPlainOpen(true) }>Open modal</IcapButton>
					<IcapModal open={ plainOpen } onClose={ () => setPlainOpen(false) } closeOnBackdropClick={ false }>
						<IcapModal.Header>Session expired</IcapModal.Header>
						<IcapModal.Content>Please log in again.</IcapModal.Content>
						<IcapModal.Footer>
							<IcapButton onClick={ () => setPlainOpen(false) }>OK</IcapButton>
						</IcapModal.Footer>
					</IcapModal>
				</Example>

				<Example
					title='Long content'
					description='The content scrolls; header and footer stay in place.'
					code={ `<IcapModal open={open} onClose={...} closable>…</IcapModal>` }>
					<IcapButton onClick={ () => setLongOpen(true) }>Open modal</IcapButton>
					<IcapModal open={ longOpen } onClose={ () => setLongOpen(false) } closable>
						<IcapModal.Header bordered>Terms & conditions</IcapModal.Header>
						<IcapModal.Content>
							{ Array.from({ length: 30 }, (_, i) => <p key={ i } className='mb-3'>Clause { i + 1 }: lorem ipsum dolor sit amet.</p>) }
						</IcapModal.Content>
						<IcapModal.Footer className='bg-primary-50'>
							<IcapButton onClick={ () => setLongOpen(false) }>Accept</IcapButton>
						</IcapModal.Footer>
					</IcapModal>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<h3 className='font-semibold mb-2'>IcapModal</h3>
				<PropsTable props={ modalProps }/>
				<h3 className='font-semibold mt-4 mb-2'>IcapModal.Header</h3>
				<PropsTable props={ headerProps }/>
				<Callout>
					The header labels the dialog for screen readers. Page scrolling is locked while a modal is open.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
