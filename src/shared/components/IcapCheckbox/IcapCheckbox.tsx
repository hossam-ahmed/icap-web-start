import type { ComponentProps, ReactNode } from "react";
import "./IcapCheckbox.css";

export type IcapCheckboxVariants = "primary" | "secondary";
export type IcapCheckboxProps = Omit<ComponentProps<"input">, "type" | "children"> & {
	variant?: IcapCheckboxVariants;
	/** Optional label rendered next to the box; clicking it toggles the checkbox. */
	children?: ReactNode;
};

/**
 * Styled native checkbox. Every native `<input>` attribute (`checked`, `defaultChecked`, `onChange`,
 * `name`, `value`, `disabled`, `required`, `ref`, `aria-*`, `className`, …) is forwarded to the input.
 */
export const IcapCheckbox = ({
	variant = "primary",
	className = "",
	children,
	...props
}: IcapCheckboxProps) => {
	return (
		<label className={ `icap-checkbox ${ variant }` }>
			<span className='checkbox-control'>
				<input type='checkbox' className={ `checkbox-input ${ className }` } { ...props }/>
				<svg className='checkbox-check' viewBox='0 0 16 16' aria-hidden='true' focusable='false'>
					<path d='M3.5 8.5l3 3 6-7' fill='none' stroke='currentColor' strokeWidth='2'
					      strokeLinecap='round' strokeLinejoin='round'/>
				</svg>
			</span>
			{ children && <span className='checkbox-label'>{ children }</span> }
		</label>
	);
};
