import type { ComponentProps, ReactNode } from "react";
import "./IcapRadio.css";

export type IcapRadioVariants = "primary" | "secondary";
export type IcapRadioProps = Omit<ComponentProps<"input">, "type" | "children"> & {
	variant?: IcapRadioVariants;
	/** Optional label rendered next to the radio; clicking it selects the radio. */
	children?: ReactNode;
};

/**
 * Styled native radio button (donut style: a thick ring when selected).
 * Every native `<input>` attribute (`name`, `value`, `checked`, `defaultChecked`, `onChange`,
 * `disabled`, `required`, `ref`, `aria-*`, `className`, …) is forwarded to the input.
 */
export const IcapRadio = ({
	variant = "primary",
	className = "",
	children,
	...props
}: IcapRadioProps) => {
	return (
		<label className={ `icap-radio ${ variant }` }>
			<input type='radio' className={ `radio-input ${ className }` } { ...props }/>
			{ children && <span className='radio-label'>{ children }</span> }
		</label>
	);
};
