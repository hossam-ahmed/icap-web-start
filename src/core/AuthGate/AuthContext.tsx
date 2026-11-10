import type { PropsWithChildren } from "react";
import { createContext, useCallback, useMemo, useState } from "react";
import { useApi } from "../../api/useApi.tsx";
import { API_METADATA } from "../../api/ApiMetadata.ts";
import type { CurrentUser, LoginCredentials, LoginResponse, UseAuthResult } from "./Auth.models.ts";

export const AuthContext = createContext<UseAuthResult | undefined>(undefined);

const TOKEN_KEY = "accessToken";
const USER_KEY = "currentUser";

/** Restore the saved user so the header can show the name after a page refresh. */
const readStoredUser = (): CurrentUser | null => {
	try {
		const raw = localStorage.getItem(USER_KEY);
		return raw ? JSON.parse(raw) as CurrentUser : null;
	} catch {
		return null;
	}
};

/**
 * Internal factory that builds the auth state and actions.
 *
 * In mock mode, `login` / `logout` are served by `mock-server/login`, which
 * accepts any non-empty credentials and returns a fake user and token.
 */
const useAuthState = (): UseAuthResult => {
	const [currentUser, setCurrentUser] = useState<CurrentUser | null>(readStoredUser);
	const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
	const api = useApi();

	const login = useCallback((credentials: LoginCredentials): Promise<CurrentUser> => {
		return api.post<LoginCredentials, LoginResponse>({
			metadata: API_METADATA.auth,
			apiUrl  : "login"
		}, credentials).then(({ user, accessToken: token }) => {
			setCurrentUser(user);
			setAccessToken(token);
			localStorage.setItem(TOKEN_KEY, token);
			localStorage.setItem(USER_KEY, JSON.stringify(user));

			return user;
		})
	}, []);

	const logout = useCallback((): Promise<void> => {
		const clearSession = () => {
			setCurrentUser(null);
			setAccessToken(null);
			localStorage.removeItem(TOKEN_KEY);
			localStorage.removeItem(USER_KEY);
		};

		// Clear the local session whether or not the server call succeeds,
		// so the user is never stuck logged in.
		return api.post({
			metadata: API_METADATA.auth,
			apiUrl  : "logout"
		})
			.then(() => undefined)
			.catch(error => console.warn("[auth] logout request failed", error))
			.finally(clearSession);
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
