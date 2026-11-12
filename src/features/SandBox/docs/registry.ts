import type { ComponentType } from "react";
import { AmountDocs } from "./AmountDocs.tsx";
import { ButtonDocs } from "./ButtonDocs.tsx";
import { DividerDocs } from "./DividerDocs.tsx";
import { IcapCardDocs } from "./IcapCardDocs.tsx";
import { IcapCheckboxDocs } from "./IcapCheckboxDocs.tsx";
import { IcapIconDocs } from "./IcapIconDocs.tsx";
import { IcapRadioDocs } from "./IcapRadioDocs.tsx";
import { LoaderDocs } from "./LoaderDocs.tsx";
import { MarketTickerDocs } from "./MarketTickerDocs.tsx";

export type ComponentDocEntry = {
	/** URL hash / unique key. */
	id: string;
	/** Label shown in the sidebar. */
	name: string;
	page: ComponentType;
};

/** Add new component docs here (see `_ComponentDocs.template.tsx`). */
export const componentDocs: ComponentDocEntry[] = [
	{ id: "amount", name: "Amount", page: AmountDocs },
	{ id: "button", name: "Button", page: ButtonDocs },
	{ id: "divider", name: "Divider", page: DividerDocs },
	{ id: "icap-card", name: "IcapCard", page: IcapCardDocs },
	{ id: "icap-checkbox", name: "IcapCheckbox", page: IcapCheckboxDocs },
	{ id: "icap-icon", name: "IcapIcon", page: IcapIconDocs },
	{ id: "icap-radio", name: "IcapRadio", page: IcapRadioDocs },
	{ id: "loader", name: "Loader", page: LoaderDocs },
	{ id: "market-ticker", name: "MarketTicker", page: MarketTickerDocs }
];
