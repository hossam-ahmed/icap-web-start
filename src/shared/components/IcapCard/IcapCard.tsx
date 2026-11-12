import type { ComponentProps } from "react";
import "./IcapCard.css";

export type IcapCardProps = ComponentProps<"div">;
export type IcapCardHeaderProps = ComponentProps<"div">;
export type IcapCardContentProps = ComponentProps<"div">;
export type IcapCardFooterProps = ComponentProps<"div">;

const CardHeader = ({ className = "", ...props }: IcapCardHeaderProps) =>
	<div className={ `card-header ${ className }` } { ...props }/>;

const CardContent = ({ className = "", ...props }: IcapCardContentProps) =>
	<div className={ `card-content ${ className }` } { ...props }/>;

const CardFooter = ({ className = "", ...props }: IcapCardFooterProps) =>
	<div className={ `card-footer ${ className }` } { ...props }/>;

const CardRoot = ({ className = "", ...props }: IcapCardProps) =>
	<div className={ `icap-card ${ className }` } { ...props }/>;

/**
 * White card with the default border radius. Compose it with the namespaced parts:
 * `<IcapCard.Header>`, `<IcapCard.Content>` and `<IcapCard.Footer>` (all optional).
 * Every part forwards native `<div>` attributes (`className`, `ref`, `onClick`, `aria-*`, …).
 */
export const IcapCard = Object.assign(CardRoot, {
	Header : CardHeader,
	Content: CardContent,
	Footer : CardFooter
});
