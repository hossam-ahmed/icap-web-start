import { AuthContext} from "./AuthContext.tsx";
import { useContext } from "react";
import type { UseAuthResult } from "./Auth.models.ts";

/**
 * Access the current auth session.
 *
 * Must be used inside an {@link AuthProvider}.
 *
 * @example
 * const { isAuthenticated, currentUser, accessToken, login, logout } = useAuth();
 */
export const useAuth = (): UseAuthResult => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an <AuthProvider>");
	}
	return context;
};
