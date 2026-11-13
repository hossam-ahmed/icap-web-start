import { type ComponentProps, type ReactNode, useId } from "react";
import { IcapTooltip, type IcapTooltipPlacement } from "@shared/components/IcapTooltip";
import "./IcapToggler.css";

export type IcapTogglerVariants = "primary" | "secondary" | "alternate";
export type IcapTogglerTooltipPlacement = IcapTooltipPlacement;
export type IcapTogglerProps = Omit<ComponentProps<"input">, "type" | "children" | "role"> & {
	variant?: IcapTogglerVariants;
	/** Optional label next to the switch; clicking it toggles the switch. */
	children?: ReactNode;
	/** Text shown in a tooltip when the switch is hovered or focused with the keyboard. */
	tooltip?: ReactNode;
	/** Where the tooltip appears (`top`, `bottom`, `start`, `end`). Default: `"top"`. */
	tooltipPlacement?: IcapTogglerTooltipPlacement;
};

/**
 * On/off switch: a styled native checkbox with `role="switch"`. Every native `<input>` attribute
 * (`checked`, `defaultChecked`, `onChange`, `name`, `disabled`, `ref`, `aria-*`, `className`, …)
 * is forwarded to the input. Sized in `em`, so a `text-*` class on a parent scales it.
 */
export const IcapToggler = ({
	variant = "primary",
	className = "",
	children,
	tooltip,
	tooltipPlacement = "top",
	"aria-describedby": describedBy,
	...props
}: IcapTogglerProps) => {
	const tooltipId = `${ useId() }-tooltip`;

	return (
		<label className={ `icap-toggler ${ variant }` }>
			{/* The tooltip is described on the input itself (describeChild off), since the input is what gets focus */ }
			<IcapTooltip content={ tooltip } placement={ tooltipPlacement } id={ tooltipId } describeChild={ false }>
				<span className='toggler-control'>
					<input
						type='checkbox'
						role='switch'
						className={ `toggler-input ${ className }` }
						aria-describedby={ [describedBy, tooltip ? tooltipId : undefined].filter(Boolean).join(" ") || undefined }
						{ ...props }/>
					<span className='toggler-thumb' aria-hidden='true'/>
				</span>
			</IcapTooltip>
			{ children && <span className='toggler-label'>{ children }</span> }
		</label>
	);
};
