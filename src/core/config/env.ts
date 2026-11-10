export type EnvConfig = {
	apiConfig: {
		apiBaseUrl: string;
		apiVersion?: string;
		origin?: string;
		/*leadVersion?: boolean;*/
	}
}
// In the app this is populated by Vite; in a plain Node process (e.g. the mock
// server) `import.meta.env` is undefined, so fall back to Node's process.env.
// `globalThis` keeps this browser-safe without depending on @types/node.
/*const runtimeEnv: Record<string, string> =
 (import.meta as { env?: Record<string, string> }).env ??
 (globalThis as { process?: { env: Record<string, string> } }).process?.env ??
 {};*/

export const env: EnvConfig = {
	apiConfig: {
		origin     : import.meta.env.VITE_API_ORIGIN,
		apiBaseUrl : import.meta.env.VITE_API_BASE_URL,
		apiVersion : import.meta.env.VITE_API_VERSION,
		/*leadVersion: eval(import.meta.env.VITE_LEAD_VERSION ?? "")*/
	}
} as const;
