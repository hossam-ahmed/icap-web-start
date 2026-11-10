/**
 * Centralized route paths.
 *
 * Import these constants instead of hard-coding path strings so links and
 * route definitions stay in sync.
 */
export const ROUTES = {
	home: "/",
	login: "/login",
	sandbox: "/sandbox"
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES];
