import { useAuth } from "@core/AuthGate/useAuth.ts";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@core/IcapRouter/paths.ts";

export const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated) {
		return (
			<Navigate
				to={ ROUTES.login }
				replace
				state={ { from: location } }
			/>
		);
	}

	return <Outlet/>;
};