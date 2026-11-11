import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@core/AuthGate/useAuth.ts";
import { ROUTES } from "@core/IcapRouter/paths.ts";

const getInitials = (name: string) =>
	name.split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join("").toUpperCase() || "?";

/** Avatar button that opens a dropdown with the user's name, email, and a logout button. */
export const ProfileMenu = () => {
	const { t } = useTranslation();
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Close on outside click or Escape.
	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
		};
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.addEventListener("pointerdown", onPointerDown);
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("pointerdown", onPointerDown);
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [open]);

	const handleLogout = () => {
		setOpen(false);
		logout().then(() => navigate(ROUTES.login, { replace: true }));
	};

	const name = currentUser?.name ?? t("auth.user");

	return (
		<div ref={ containerRef } className='relative'>
			<button
				type='button'
				className='flex items-center gap-2 rounded-full p-1 pe-3 hover:bg-neutral-100'
				aria-haspopup='menu'
				aria-expanded={ open }
				aria-label={ t("auth.profile") }
				onClick={ () => setOpen(o => !o) }>
				<span className='grid place-items-center size-8 rounded-full bg-primary text-white text-sm font-semibold'>
					{ getInitials(name) }
				</span>
				<span className='text-sm font-medium'>{ name }</span>
			</button>

			{ open && (
				<div
					role='menu'
					className='absolute end-0 top-full mt-2 w-56 rounded-md border border-neutral-200 bg-white shadow-lg z-10'>
					<div className='px-4 py-3 border-b border-neutral-200'>
						<p className='font-medium truncate'>{ name }</p>
						{ currentUser?.email && (
							<p className='text-sm text-neutral-500 truncate'>{ currentUser.email }</p>
						) }
					</div>
					<button
						type='button'
						role='menuitem'
						className='w-full px-4 py-2 text-start text-red-600 hover:bg-neutral-100'
						onClick={ handleLogout }>
						{ t("auth.logout") }
					</button>
				</div>
			) }
		</div>
	);
};
