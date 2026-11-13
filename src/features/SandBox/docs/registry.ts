import type { ComponentType } from "react";
import { AmountDocs } from "./AmountDocs.tsx";
import { ButtonDocs } from "./ButtonDocs.tsx";
import { DividerDocs } from "./DividerDocs.tsx";
import { IcapCardDocs } from "./IcapCardDocs.tsx";
import { IcapCheckboxDocs } from "./IcapCheckboxDocs.tsx";
import { IcapIconDocs } from "./IcapIconDocs.tsx";
import { IcapRadioDocs } from "./IcapRadioDocs.tsx";
import { IcapTogglerDocs } from "./IcapTogglerDocs.tsx";
import { LoaderDocs } from "./LoaderDocs.tsx";
import { MarketTickerDocs } from "./MarketTickerDocs.tsx";
import { ModalDocs } from "./ModalDocs.tsx";
import { TabsDocs } from "./TabsDocs.tsx";

export type ComponentDocEntry = {
	/** URL hash / unique key. */
	id: string;
	/** Label shown in the sidebar. */
	name: string;
	page: ComponentType;
};

/** Add new component docs here (see `_ComponentDocs.template.tsx`). */
export const componentDocs: ComponentDocEntry[] = [
	{ id: "divider", name: "Divider", page: DividerDocs },
	{ id: "amount", name: "IcapAmount", page: AmountDocs },
	{ id: "button", name: "IcapButton", page: ButtonDocs },
	{ id: "icap-card", name: "IcapCard", page: IcapCardDocs },
	{ id: "icap-checkbox", name: "IcapCheckbox", page: IcapCheckboxDocs },
	{ id: "icap-icon", name: "IcapIcon", page: IcapIconDocs },
	{ id: "loader", name: "IcapLoader", page: LoaderDocs },
	{ id: "modal", name: "IcapModal", page: ModalDocs },
	{ id: "icap-radio", name: "IcapRadio", page: IcapRadioDocs },
	{ id: "tabs", name: "IcapTabGroup", page: TabsDocs },
	{ id: "icap-toggler", name: "IcapToggler", page: IcapTogglerDocs },
	{ id: "market-ticker", name: "MarketTicker", page: MarketTickerDocs }
];
