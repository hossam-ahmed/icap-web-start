import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@core/IcapRouter/paths.ts";

type MenuItem = {
	to: string;
	labelKey: "nav.home" | "nav.sandbox";
};

/** Add new side menu entries here. */
const MENU_ITEMS: MenuItem[] = [
	{ to: ROUTES.home, labelKey: "nav.home" },
	{ to: ROUTES.sandbox, labelKey: "nav.sandbox" }
];

/** Vertical navigation for authenticated pages. Highlights the active route. */
export const SideMenu = () => {
	const { t } = useTranslation();

	return (
		<aside className='w-60 shrink-0 border-e border-neutral-200 bg-neutral-50'>
			<nav className='flex flex-col gap-1 p-3'>
				{ MENU_ITEMS.map(({ to, labelKey }) => (
					<NavLink
						key={ to }
						to={ to }
						end
						className={ ({ isActive }) =>
							`rounded-md px-3 py-2 transition-colors ${
								isActive ? "bg-primary text-white" : "hover:bg-neutral-200"
							}` }>
						{ t(labelKey) }
					</NavLink>
				)) }
			</nav>
		</aside>
	);
};
