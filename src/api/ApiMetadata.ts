export type ApiControllers = 'auth';

export type APIMetadata = {
	microserviceBaseurl: string;
	controller: string;
}
export type APIMetadataType = {
	[K in ApiControllers]: APIMetadata;
};

export const API_METADATA: APIMetadataType = {
	auth: {
		microserviceBaseurl: "auth-svc",
		controller         : "login"
	}
};
