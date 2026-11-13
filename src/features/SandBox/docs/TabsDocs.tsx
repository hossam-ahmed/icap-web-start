import { useState } from "react";
import { IcapTab, IcapTabGroup } from "@shared/components/IcapTabGroup";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const groupProps: PropDoc[] = [
	{
		name       : "value",
		type       : "string",
		description: "Selected tab (controlled). Use together with onValueChange."
	},
	{
		name       : "defaultValue",
		type       : "string",
		default    : "first enabled tab",
		description: "Initially selected tab (uncontrolled)."
	},
	{
		name       : "onValueChange",
		type       : "(value: string) => void",
		description: "Called with the new value when the user selects a tab."
	},
	{
		name       : "aria-label",
		type       : "string",
		description: "Accessible name of the tab list."
	},
	{
		name       : "...rest",
		type       : `ComponentProps<"div">`,
		description: <>Forwarded to the wrapper (<InlineCode>className</InlineCode>, <InlineCode>ref</InlineCode>, …).</>
	}
];

const tabProps: PropDoc[] = [
	{
		name       : "value",
		type       : "string",
		default    : "its index",
		description: "Identifies the tab."
	},
	{
		name       : "disabled",
		type       : "boolean",
		default    : "false",
		description: "The tab can't be selected."
	}
];

export const TabsDocs = () => {
	const [tab, setTab] = useState("documents");

	return (
		<DocPage
			title='IcapTabGroup'
			description={ <>Tabs composed with namespaced parts: <InlineCode>IcapTabGroup</InlineCode> → <InlineCode>IcapTab</InlineCode> →
				<InlineCode>IcapTab.Trigger</InlineCode> + <InlineCode>IcapTab.Content</InlineCode>. Switching tabs uses
				React's <InlineCode>&lt;ViewTransition&gt;</InlineCode>: the content cross-fades and the underline slides to the new tab.</> }
			importCode={ `import { IcapTabGroup, IcapTab } from "@shared/components/IcapTabGroup";` }>

			<DocSection title='Usage'>
				<Example
					title='Uncontrolled'
					code={ `
<IcapTabGroup defaultValue="overview" aria-label="Fund details">
  <IcapTab value="overview">
    <IcapTab.Trigger>Overview</IcapTab.Trigger>
    <IcapTab.Content>Fund overview…</IcapTab.Content>
  </IcapTab>
  <IcapTab value="documents">
    <IcapTab.Trigger>Documents</IcapTab.Trigger>
    <IcapTab.Content>Fund documents…</IcapTab.Content>
  </IcapTab>
</IcapTabGroup>` }>
					<IcapTabGroup defaultValue='overview' aria-label='Fund details'>
						<IcapTab value='overview'>
							<IcapTab.Trigger>Overview</IcapTab.Trigger>
							<IcapTab.Content>Fund overview: strategy, performance and risk level.</IcapTab.Content>
						</IcapTab>
						<IcapTab value='documents'>
							<IcapTab.Trigger>Documents</IcapTab.Trigger>
							<IcapTab.Content>Prospectus, factsheet and annual reports.</IcapTab.Content>
						</IcapTab>
					</IcapTabGroup>
				</Example>

				<Example
					title='Controlled, with a disabled tab'
					code={ `
const [tab, setTab] = useState("documents");

<IcapTabGroup value={tab} onValueChange={setTab}>
  <IcapTab value="overview">…</IcapTab>
  <IcapTab value="documents">…</IcapTab>
  <IcapTab value="history" disabled>…</IcapTab>
</IcapTabGroup>` }>
					<div className='flex flex-col gap-3'>
						<IcapTabGroup value={ tab } onValueChange={ setTab }>
							<IcapTab value='overview'>
								<IcapTab.Trigger>Overview</IcapTab.Trigger>
								<IcapTab.Content>Overview content.</IcapTab.Content>
							</IcapTab>
							<IcapTab value='documents'>
								<IcapTab.Trigger>Documents</IcapTab.Trigger>
								<IcapTab.Content>Documents content.</IcapTab.Content>
							</IcapTab>
							<IcapTab value='history' disabled>
								<IcapTab.Trigger>History</IcapTab.Trigger>
								<IcapTab.Content>History content.</IcapTab.Content>
							</IcapTab>
						</IcapTabGroup>
						<span className='text-sm'>Selected: { tab }</span>
					</div>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<h3 className='font-semibold mb-2'>IcapTabGroup</h3>
				<PropsTable props={ groupProps }/>
				<h3 className='font-semibold mt-4 mb-2'>IcapTab</h3>
				<PropsTable props={ tabProps }/>
				<Callout>
					<InlineCode>IcapTab.Trigger</InlineCode> forwards native button attributes and <InlineCode>IcapTab.Content</InlineCode> native
					div attributes. <InlineCode>IcapTab</InlineCode> must be a direct child of <InlineCode>IcapTabGroup</InlineCode>, and the parts
					direct children of <InlineCode>IcapTab</InlineCode>. Keyboard: ←/→ move between tabs (mirrored in RTL), Home/End jump to the ends.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
