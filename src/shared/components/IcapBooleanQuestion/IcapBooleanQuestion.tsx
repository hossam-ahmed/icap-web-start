import { type ComponentProps, type ReactNode, useId } from "react";
import { IcapBoxPanel } from "@shared/components/IcapBoxPanel";
import { IcapRadio, type IcapRadioVariants } from "@shared/components/IcapRadio";
import "./IcapBooleanQuestion.css";

export type IcapBooleanQuestionChoice = {
	label: ReactNode;
	value: string;
	disabled?: boolean;
};

export type IcapBooleanQuestionProps = Omit<ComponentProps<"div">, "onChange" | "defaultValue" | "children"> & {
	/** The question text. */
	question: ReactNode;
	/** The answers. Default: Yes (`"yes"`) / No (`"no"`). */
	choices?: IcapBooleanQuestionChoice[];
	/** Selected choice value (controlled). `null` = unanswered. */
	value?: string | null;
	/** Initially selected choice value (uncontrolled). */
	defaultValue?: string | null;
	/** Called with the chosen value when the user answers. */
	onChange?: (value: string) => void;
	/** Radio group name (also the form field name). Default: a unique generated name. */
	name?: string;
	/** Disables all choices. */
	disabled?: boolean;
	/** The question must be answered before a native form submits. */
	required?: boolean;
	/** Marks the question as invalid (red border), e.g. from form validation. */
	invalid?: boolean;
	/** Color of the radios. Default: `"primary"`. */
	variant?: IcapRadioVariants;
};

const yesNo: IcapBooleanQuestionChoice[] = [
	{ label: "Yes", value: "yes" },
	{ label: "No", value: "no" }
];

/**
 * A question with a set of single-choice answers (Yes / No by default), shown as boxed radios in a panel.
 * Each instance is its own radio group, so several questions can sit on one page.
 *
 * Form-ready: `name` / `value` / `onChange` / `required` / `disabled` / `invalid`. The radios are native,
 * so the answer is submitted with native forms under `name`.
 */
export const IcapBooleanQuestion = ({
	question,
	choices = yesNo,
	value,
	defaultValue,
	onChange,
	name,
	disabled = false,
	required = false,
	invalid = false,
	variant = "secondary",
	className = "",
	...props
}: IcapBooleanQuestionProps) => {
	const baseId = useId();
	const groupName = name ?? `${ baseId }-choice`;
	const questionId = `${ baseId }-question`;
	const isControlled = value !== undefined;

	return (
		<IcapBoxPanel
			role='radiogroup'
			aria-labelledby={ questionId }
			aria-required={ required || undefined }
			aria-invalid={ invalid || undefined }
			className={ `icap-boolean-question ${ invalid ? "invalid" : "" } ${ className }` }
			{ ...props }>
			<div id={ questionId } className='question-content'>
				{ question }
			</div>
			<ul className='options-list'>
				{ choices.map(choice => (
					<li key={ choice.value }>
						<IcapRadio
							name={ groupName }
							value={ choice.value }
							variant={ variant }
							boxed
							required={ required }
							disabled={ disabled || choice.disabled }
							{ ...(isControlled
								? { checked: value === choice.value }
								: { defaultChecked: defaultValue === choice.value }) }
							onChange={ e => e.target.checked && onChange?.(choice.value) }>
							{ choice.label }
						</IcapRadio>
					</li>
				)) }
			</ul>
		</IcapBoxPanel>
	);
};
