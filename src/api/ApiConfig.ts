import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { APIMetadata } from "./ApiMetadata.ts";

export type APIConfig = {
	origin?: string;
	metadata: APIMetadata;
	apiBaseUrl?: string;
	apiUrl?: string;
	version?: string;
	leadVersion?: boolean;
	axiosConfig?: AxiosRequestConfig;
};
/**
 * Reusable hook for calling HTTP APIs, similar to an `ApiService` in Angular.
 *
 * Exposes typed `get`, `post`, `put`, `patch` and `delete` methods that share
 * a single pre-configured axios instance (base URL, default headers, etc.).
 *
 * @example
 * const api = useApi();
 * const products = await api.get<ProductModel[]>("/products");
 */
export type UseApiResult = {
	get: <TResponseBody>(config: APIConfig) => Promise<TResponseBody>;
	post: <TRequestBody, TResponseBody = unknown>(config: APIConfig,
		body?: TRequestBody) => Promise<TResponseBody>;
	put: <TRequestBody, TResponseBody = unknown>(config: APIConfig,
		body?: TRequestBody) => Promise<TResponseBody>;
	patch: <TRequestBody, TResponseBody = unknown>(config: APIConfig,
		body?: TRequestBody) => Promise<TResponseBody>;
	delete: <TResponseBody>(config: APIConfig) => Promise<TResponseBody>;
	client: AxiosInstance;
};
