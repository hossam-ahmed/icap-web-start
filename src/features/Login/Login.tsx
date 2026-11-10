import { Navigate, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { Button } from "@shared/components/Button";
import { useAuth } from "@core/AuthGate/useAuth.ts";
import { ROUTES } from "@core/IcapRouter/paths.ts";

export const Login = () => {

	const { login, isAuthenticated } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	// `ProtectedRoute` stores the page the user tried to open in `state.from`;
	// send them back there after login, otherwise go home.
	const redirectTo = (location.state as { from?: Location } | null)?.from?.pathname ?? ROUTES.home;

	// Already logged in (e.g. visiting /login directly) — skip the login page.
	if (isAuthenticated) {
		return <Navigate to={ redirectTo } replace/>;
	}

	const handleLogin = () => {
		login({ email: 'hossam@gmail.com', password: '123456' })
			.then(() => navigate(redirectTo, { replace: true }));
	};

	return (
		<>
			<h1>Login First ...</h1>
			<Button onClick={ handleLogin }>Login</Button>
		</>
	)
};
