import type { ComponentProps } from "react";
import "./IcapBoxPanel.css";

export type IcapBoxPanelProps = ComponentProps<"div">;

/**
 * Plain container box: white background, default border radius and a 1px `border-color-primary`
 * border. No padding or layout of its own; add them with `className`.
 * Every native `<div>` attribute (`className`, `ref`, `onClick`, `aria-*`, …) is forwarded.
 */
export const IcapBoxPanel = ({ className = "", ...props }: IcapBoxPanelProps) =>
	<div className={ `icap-box-panel ${ className }` } { ...props }/>;
