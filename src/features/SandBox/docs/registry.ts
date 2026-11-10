import type { ComponentType } from "react";
import { ButtonDocs } from "./ButtonDocs.tsx";
import { IcapIconDocs } from "./IcapIconDocs.tsx";
import { LoaderDocs } from "./LoaderDocs.tsx";

export type ComponentDocEntry = {
	/** URL hash / unique key. */
	id: string;
	/** Label shown in the sidebar. */
	name: string;
	page: ComponentType;
};

/** Add new component docs here (see `_ComponentDocs.template.tsx`). */
export const componentDocs: ComponentDocEntry[] = [
	{ id: "button", name: "Button", page: ButtonDocs },
	{ id: "icap-icon", name: "IcapIcon", page: IcapIconDocs },
	{ id: "loader", name: "Loader", page: LoaderDocs }
];
