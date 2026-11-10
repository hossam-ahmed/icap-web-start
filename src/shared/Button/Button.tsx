import type { ComponentProps } from "react";
import "./Button.css"

export type ButtonVariants = "primary" | "secondary";
export type ButtonProps = ComponentProps<"button"> & {
	variant?: ButtonVariants;
};

export const Button = ({
	type = "button",
	className,
	variant,
	children,
	...props
}: ButtonProps) => {
	return <button type={ type }
	               className={ `icap-button ${ variant } ${ className }` } { ...props }>
		{ children }
	</button>;
};
