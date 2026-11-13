import type { ComponentProps } from "react";
import "./IcapButton.css"

export type ButtonVariants = "primary" | "secondary";
export type ButtonProps = ComponentProps<"button"> & {
	variant?: ButtonVariants;
};

export const IcapButton = ({
	type = "button",
	className,
	variant = 'primary',
	children,
	...props
}: ButtonProps) => {
	return <button type={ type }
	               className={ `icap-button ${ variant } ${ className }` } { ...props }>
		{ children }
	</button>;
};
