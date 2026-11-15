import { useState } from "react";
import { IcapBooleanQuestion } from "@shared/components/IcapBooleanQuestion";
import { IcapButton } from "@shared/components/IcapButton";
import { Callout, DocPage, DocSection, Example, InlineCode, type PropDoc, PropsTable } from "../doc-kit/DocKit.tsx";

const questionProps: PropDoc[] = [
	{ name: "question", type: "ReactNode", required: true, description: "The question text." },
	{
		name       : "choices",
		type       : "{ label, value, disabled? }[]",
		default    : `Yes ("yes") / No ("no")`,
		description: "The answers, shown as boxed radios."
	},
	{ name: "value", type: "string | null", description: "Selected choice value (controlled). null = unanswered." },
	{ name: "defaultValue", type: "string | null", description: "Initially selected choice value (uncontrolled)." },
	{ name: "onChange", type: "(value: string) => void", description: "Called with the chosen value when the user answers." },
	{
		name       : "name",
		type       : "string",
		default    : "generated",
		description: "Radio group name, also the form field name. Each question gets a unique one by default, so several questions on one page don't interfere."
	},
	{ name: "required", type: "boolean", default: "false", description: "Must be answered before a native form submits." },
	{ name: "disabled / invalid", type: "boolean", default: "false", description: "Disables all choices / shows the error border." },
	{ name: "variant", type: `"primary" | "secondary" | "alternate"`, default: `"primary"`, description: "Color of the radios." },
	{
		name       : "...rest",
		type       : `ComponentProps<"div">`,
		description: <>Forwarded to the panel (<InlineCode>className</InlineCode>, <InlineCode>id</InlineCode>, <InlineCode>aria-*</InlineCode>, …).</>
	}
];

export const IcapBooleanQuestionDocs = () => {
	const [answer, setAnswer] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState<string>("");

	return (
		<DocPage
			title='IcapBooleanQuestion'
			description={ <>A question with single-choice answers (Yes / No by default), shown as boxed radios inside an
				<InlineCode>IcapBoxPanel</InlineCode>. Useful for questionnaires such as suitability or KYC forms.</> }
			importCode={ `import { IcapBooleanQuestion } from "@shared/components/IcapBooleanQuestion";` }>

			<DocSection title='Usage'>
				<Example
					title='Yes / No'
					description='Each question is its own radio group, so answering one never clears another.'
					contentClassName='flex flex-col gap-3'
					code={ `
<IcapBooleanQuestion question="Are you a politically exposed person?" />
<IcapBooleanQuestion question="Do you have investment experience?" defaultValue="yes" />` }>
					<IcapBooleanQuestion question='Are you a politically exposed person?'/>
					<IcapBooleanQuestion question='Do you have investment experience?' defaultValue='yes'/>
				</Example>

				<Example
					title='Custom choices'
					contentClassName='flex flex-col gap-3'
					code={ `
<IcapBooleanQuestion
  question="How would you describe your risk appetite?"
  variant="secondary"
  choices={[
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" }
  ]}
/>` }>
					<IcapBooleanQuestion
						question='How would you describe your risk appetite?'
						variant='secondary'
						choices={ [
							{ label: "Low", value: "low" },
							{ label: "Medium", value: "medium" },
							{ label: "High", value: "high" }
						] }/>
				</Example>

				<Example
					title='Controlled'
					contentClassName='flex flex-col gap-3'
					code={ `
const [answer, setAnswer] = useState<string | null>(null);

<IcapBooleanQuestion question="Do you accept the terms?" value={answer} onChange={setAnswer} />` }>
					<IcapBooleanQuestion question='Do you accept the terms?' value={ answer } onChange={ setAnswer }/>
					<span className='text-sm'>value: { String(answer) }</span>
				</Example>
			</DocSection>

			<DocSection title='Forms & states'>
				<Example
					title='Native form'
					description='The radios are native, so the answer is submitted under name; required blocks submission until answered.'
					contentClassName='flex flex-col gap-3'
					code={ `
<form onSubmit={…}>
  <IcapBooleanQuestion name="hasExperience" question="Do you have investment experience?" required />
  <IcapButton type="submit">Submit</IcapButton>
</form>` }>
					<form className='flex flex-col gap-3' onSubmit={ e => {
						e.preventDefault();
						setSubmitted(JSON.stringify(Object.fromEntries(new FormData(e.currentTarget))));
					} }>
						<IcapBooleanQuestion name='hasExperience' question='Do you have investment experience?' required/>
						<div className='flex items-center gap-3'>
							<IcapButton type='submit'>Submit</IcapButton>
							<span className='text-sm'>{ submitted && `submitted: ${ submitted }` }</span>
						</div>
					</form>
				</Example>

				<Example
					title='Invalid & disabled'
					contentClassName='flex flex-col gap-3'
					code={ `
<IcapBooleanQuestion question="Is the beneficiary a US person?" invalid />
<IcapBooleanQuestion question="Account already verified?" defaultValue="yes" disabled />` }>
					<IcapBooleanQuestion question='Is the beneficiary a US person?' invalid/>
					<IcapBooleanQuestion question='Account already verified?' defaultValue='yes' disabled/>
				</Example>
			</DocSection>

			<DocSection title='Props'>
				<PropsTable props={ questionProps }/>
				<Callout>
					The panel is a <InlineCode>radiogroup</InlineCode> labelled by the question, so screen readers announce the question with
					the choices. Translate the default Yes / No by passing <InlineCode>choices</InlineCode>.
				</Callout>
			</DocSection>
		</DocPage>
	);
};
