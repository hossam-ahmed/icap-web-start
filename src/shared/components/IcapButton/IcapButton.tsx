import type { ComponentProps } from "react";
import "./IcapButton.css"

export type ButtonVariants = "primary" | "secondary" | "alternate" | "transparent";
export type ButtonProps = ComponentProps<"button"> & {
	variant?: ButtonVariants;
	/** Transparent background with a border in the variant's color. Default: `false`. */
	outlined?: boolean;
};

export const IcapButton = ({
	type = "button",
	className = "",
	variant = "primary",
	outlined = false,
	children,
	...props
}: ButtonProps) => {
	return <button type={ type }
	               className={ `icap-button ${ variant } ${ outlined ? "outlined" : "" } ${ className }` } { ...props }>
		{ children }
	</button>;
};
