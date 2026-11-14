import type { ComponentProps } from "react";
import "./IcapButton.css"

export type ButtonVariants = "primary" | "secondary" | "alternate" | "transparent" | "gradient";
export type ButtonSizes = "sm" | "md" | "lg";
export type ButtonProps = ComponentProps<"button"> & {
	variant?: ButtonVariants;
	/** Transparent background with a border in the variant's color. Default: `false`. */
	outlined?: boolean;
	/** `sm` (30px tall, 12px text), `md` (37px, 14px text) or `lg` (48px, 16px text). Default: `"md"`. */
	size?: ButtonSizes;
	/** A square button for a single icon (as wide as it is tall). Give it an `aria-label`. Default: `false`. */
	iconOnly?: boolean;
};

export const IcapButton = ({
	type = "button",
	className = "",
	variant = "primary",
	outlined = false,
	size = "md",
	iconOnly = false,
	children,
	...props
}: ButtonProps) => {
	return <button type={ type }
	               className={ `icap-button ${ variant } ${ outlined ? "outlined" : "" } ${ size === "md" ? "" : `btn-${ size }` } ${ iconOnly ? "icon-only" : "" } ${ className }` } { ...props }>
		{ children }
	</button>;
};
