export type ApiControllers = 'serviceA';

export type APIMetadata = {
	microserviceBaseurl: string;
	controller: string;
}
export type APIMetadataType = {
	[K in ApiControllers]: APIMetadata;
};

export const API_METADATA: APIMetadataType = {
	serviceA: {
		microserviceBaseurl: "service-a-svc",
		controller         : "ServiceA"
	}
};
