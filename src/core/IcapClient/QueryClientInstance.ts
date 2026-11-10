import { QueryClient } from "@tanstack/react-query";

/**
 * Single, app-wide TanStack Query client.
 *
 * Owns the server-state cache and the default behavior for every query and
 * mutation. Created once here (outside React), so the same instance is shared
 * across the tree and survives re-renders.
 */
export const QueryClientInstance = new QueryClient({
	defaultOptions: {
		queries  : {
			// Data is considered fresh for a minute before a background refetch is
			// eligible — avoids hammering the API on every mount/navigation.
			staleTime: 60_000,
			// Keep unused data around for 5 minutes, so navigating back is instant.
			gcTime              : 5 * 60_000,
			retry               : 1,
			refetchOnWindowFocus: false
		},
		mutations: {
			retry: 1
		}
	}
});
