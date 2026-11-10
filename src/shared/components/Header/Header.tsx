import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@shared/components/LanguageSwitcher";
import { useAuth } from "@core/AuthGate/useAuth.ts";
import { ROUTES } from "@core/IcapRouter/paths.ts";
import { ProfileMenu } from "./ProfileMenu.tsx";

/**
 * Top app bar: logo on the start side; language switcher and either the
 * profile menu (logged in) or a login button (guest) on the end side.
 */
export const Header = () => {
	const { t } = useTranslation();
	const { isAuthenticated } = useAuth();
	const { pathname } = useLocation();

	return (
		<header className='flex items-center justify-between h-16 px-6 border-b border-neutral-200 bg-white'>
			<Link to={ ROUTES.home } className='flex items-center gap-2' aria-label={ t("app.title") }>
				{/* TODO: replace placeholder with the real logo asset */ }
				<span className='grid place-items-center size-9 rounded-md bg-primary text-white text-xs font-bold'>
					LOGO
				</span>
				<span className='font-semibold'>{ t("app.title") }</span>
			</Link>

			<div className='flex items-center gap-4'>
				<LanguageSwitcher/>

				{ isAuthenticated ? (
					<ProfileMenu/>
				) : pathname !== ROUTES.login && (
					// No point showing "Login" while already on the login page.
					<Link
						to={ ROUTES.login }
						className='rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-600'>
						{ t("auth.login") }
					</Link>
				) }
			</div>
		</header>
	);
};
