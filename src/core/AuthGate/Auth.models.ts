export type CurrentUser = {
	id: string;
	name: string;
	email: string;
};

/**
 * Credentials accepted by {@link UseAuthResult.login}.
 */
export type LoginCredentials = {
	email: string;
	password: string;
};

/**
 * Response body returned by the login endpoint.
 */
export type LoginResponse = {
	user: CurrentUser;
	accessToken: string;
};

/**
 * Shape of the auth hook, similar to an `AuthService` in Angular.
 *
 * Exposes the current session (`currentUser`, `accessToken`, `isAuthenticated`)
 * along with `login` / `logout` actions.
 */
export type UseAuthResult = {
	currentUser: CurrentUser | null;
	accessToken: string | null;
	isAuthenticated: boolean;
	login: (credentials: LoginCredentials) => Promise<CurrentUser>;
	logout: () => void;
};
