import type { PropsWithChildren } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import { useApi } from "../../api/useApi.tsx";
import { API_METADATA } from "../../api/ApiMetadata.ts";
import type { CurrentUser, LoginCredentials, LoginResponse, UseAuthResult } from "./Auth.models.ts";

export const AuthContext = createContext<UseAuthResult | undefined>(undefined);

/**
 * Internal factory that builds the auth state and actions.
 *
 * In mock mode, `login` / `logout` are served by `mock-server/login`, which
 * accepts any non-empty credentials and returns a fake user and token.
 */
const useAuthState = (): UseAuthResult => {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem("accessToken"));
	const api = useApi();

	const login = useCallback((credentials: LoginCredentials): Promise<CurrentUser> => {
		return api.post<LoginCredentials, LoginResponse>({
			metadata: API_METADATA.auth,
			apiUrl  : "login"
		}, credentials).then(({ user, accessToken: token }) => {
			setCurrentUser(user);
			setAccessToken(token);
			localStorage.setItem("accessToken", token);

			return user;
		})
	}, []);

	const logout = useCallback(() => {
		return api.post({
			metadata: API_METADATA.auth,
			apiUrl  : "logout"
		}).then(() => {
			setCurrentUser(null);
			setAccessToken(null);
			localStorage.removeItem("accessToken");
		});
	}, []);

	return useMemo<UseAuthResult>(() => ({
		currentUser,
		accessToken,
		isAuthenticated: !!accessToken,
		login,
		logout
	}), [currentUser, accessToken, login, logout]);
};

/**
 * Provides a single shared auth session to the component tree.
 *
 * Wrap the app (or the authenticated area) with this so every `useAuth()`
 * consumer reads and mutates the same session. The provider always renders its
 * children — deciding what to show for guests vs. authenticated users (e.g. a
 * login page vs. the app) is the caller's responsibility.
 *
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export const AuthProvider = ({ children }: PropsWithChildren) => {
	const auth = useAuthState();
	return <AuthContext.Provider value={ auth }>{ children }</AuthContext.Provider>;
};
