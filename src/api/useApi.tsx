import { useCallback, useMemo } from "react";
import type { AxiosInstance, AxiosResponse } from "axios";
import axios from "axios";
import type { APIConfig, UseApiResult } from "./ApiConfig.ts";
import { env } from "../config/env.ts";
import { delay } from "../globals/utils.ts";
import { useLoader } from "../shared/Loader/useLoader.tsx";

const computeOrigin = (): string => {
	return window.location?.origin;
}

const generateRequestUrl = (config: APIConfig): string => {
	// get computed domain
	const origin = config.origin ?? env.apiConfig?.origin ?? computeOrigin();

	// get computed api segment
	const microserviceBaseurl = config.metadata?.microserviceBaseurl;

	// get computed configuration
	const apiBaseUrl = config.apiBaseUrl ?? env.apiConfig?.apiBaseUrl!;

	// compute api version
	const apiVersion = config.version ?? env.apiConfig?.apiVersion!;

	// get computed controller
	const controller = config.metadata?.controller;

	// get computed apiUrl
	const apiUrl: string | undefined = config.apiUrl;

	const leadVersion: boolean = config.leadVersion ?? !!env.apiConfig?.leadVersion;

	const urlSegments = leadVersion ?
	                    [origin, microserviceBaseurl, apiBaseUrl, apiVersion, controller, apiUrl] :
	                    [origin, microserviceBaseurl, apiBaseUrl, controller, apiVersion, apiUrl];

	// compose full service url
	return urlSegments
		.filter((section) => section)
		.join("/");
}

export const useApi = (): UseApiResult => {

	const { showLoader, hideLoader } = useLoader();

	const apiWrapper = () => {
		showLoader();
		return delay().finally(() => {
			hideLoader()
		});
	};

	// Create the axios instance once per hook consumer.
	const client = useMemo<AxiosInstance>(() => {
		return axios.create();
	}, []);

	const get = useCallback(<TResponseBody, >(config: APIConfig): Promise<TResponseBody> => {
			return apiWrapper().then(() => {
				const parsedUrl = generateRequestUrl(config);
				return client.get<TResponseBody>(parsedUrl).then((response) => response.data)
			})
		},
		[client]
	);

	const post = useCallback(
		<TRequestBody, TResponseBody = unknown>(config: APIConfig,
			body?: TRequestBody): Promise<TResponseBody> => {
			const parsedUrl = generateRequestUrl(config);
			return apiWrapper().then(() => {
				return client.post<TRequestBody, AxiosResponse>(parsedUrl, body, config?.axiosConfig)
				             .then((response) => response.data);
			})
		},
		[client]
	);

	const put = useCallback(
		<TRequestBody, TResponseBody = unknown>(config: APIConfig,
			body?: TRequestBody): Promise<TResponseBody> => {
			const parsedUrl = generateRequestUrl(config);
			return apiWrapper().then(() => {
				return client.put<TRequestBody, AxiosResponse>(parsedUrl, body, config?.axiosConfig)
				             .then((response) => response.data);
			})
		},
		[client]
	);

	const patch = useCallback(
		<TRequestBody, TResponseBody = unknown>(config: APIConfig,
			body?: TRequestBody): Promise<TResponseBody> => {
			const parsedUrl = generateRequestUrl(config);
			return apiWrapper().then(() => {
				return client.patch<TRequestBody, AxiosResponse>(parsedUrl, body, config?.axiosConfig)
				             .then((response) => response.data);
			})
		},
		[client]
	);

	const del = useCallback(
		<TResponseBody, >(config: APIConfig): Promise<TResponseBody> => {
			const parsedUrl = generateRequestUrl(config);
			return apiWrapper().then(() => {
				return client.delete<TResponseBody>(parsedUrl, config?.axiosConfig).then((response) => response.data);
			})
		},
		[client]
	);

	return {
		get,
		post,
		put,
		patch,
		delete: del,
		client
	};
};
