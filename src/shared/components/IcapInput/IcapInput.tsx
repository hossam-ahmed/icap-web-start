import { type ComponentProps, type ReactNode, useId } from "react";
import "./IcapInput.css";

type IcapInputCommonProps = {
	/**
	 * Floating label inside the border. Rests in the middle of the field while it's empty (and has no
	 * placeholder), and moves to the top, smaller, on focus or once there's a value.
	 */
	label?: ReactNode;
	/** Marks the field as invalid (red border), e.g. from form validation. */
	invalid?: boolean;
	/** Classes on the wrapper (the bordered box). A `text-*` class scales the whole field. */
	className?: string;
	/** Classes on the `<input>` / `<textarea>` itself. */
	controlClassName?: string;
};

export type IcapInputSingleLineProps = IcapInputCommonProps & Omit<ComponentProps<"input">, "className"> & {
	/** Renders a `<textarea>` instead of an `<input>`. Default: `false`. */
	multiline?: false;
};

export type IcapInputMultiLineProps = IcapInputCommonProps & Omit<ComponentProps<"textarea">, "className"> & {
	/** Renders a `<textarea>` instead of an `<input>`. */
	multiline: true;
};

export type IcapInputProps = IcapInputSingleLineProps | IcapInputMultiLineProps;

/**
 * Text field with a floating label inside its border: an `<input>` by default, or a `<textarea>`
 * with `multiline`. Every native attribute (`value`, `defaultValue`, `onChange`, `name`, `type`,
 * `rows`, `disabled`, `required`, `ref`, `aria-*`, …) goes to the input/textarea, so it works
 * directly with react-hook-form's `register()`.
 *
 * The label position is pure CSS (focus and `:placeholder-shown`), so it follows controlled,
 * uncontrolled and browser-autofilled values alike.
 */
export const IcapInput = (props: IcapInputProps) => {
	const { label, invalid = false, className = "", controlClassName = "", placeholder, id, multiline, ...rest } = props;
	const generatedId = useId();
	const controlId = id ?? generatedId;

	// With a label but no placeholder, a single space keeps :placeholder-shown working:
	// it's "shown" exactly while the field is empty, which is when the label rests in the middle.
	const controlPlaceholder = placeholder ?? (label ? " " : undefined);

	const classes = [
		"icap-input",
		multiline ? "multiline" : "",
		label ? "has-label" : "",
		placeholder ? "has-placeholder" : "",
		invalid ? "invalid" : "",
		className
	].join(" ");

	const controlProps = {
		id                : controlId,
		className         : `input-control ${ controlClassName }`,
		placeholder       : controlPlaceholder,
		"aria-invalid"    : invalid || undefined
	};

	return (
		<div className={ classes }>
			{ multiline
				? <textarea rows={ 3 } { ...(rest as ComponentProps<"textarea">) } { ...controlProps }/>
				: <input type='text' { ...(rest as ComponentProps<"input">) } { ...controlProps }/> }
			{/* After the control, so CSS can react to its state with the ~ sibling selector */ }
			{ label && <label htmlFor={ controlId } className='input-label'>{ label }</label> }
		</div>
	);
};
