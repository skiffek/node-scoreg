import { Agent, AgentOptions } from "https";
import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosPromise,
	AxiosResponseHeaders,
} from "axios";

export const BASE_URL = "https://www.scoreg.at/ScoregWebServer/services/v1";

export default abstract class Client {
	private readonly axios: AxiosInstance;

	public constructor({
		username,
		password,
		accessKey,
		agent = { keepAlive: true },
	}: ClientOptions) {
		if (!(agent instanceof Agent)) agent = new Agent(agent);

		this.axios = axios.create({
			httpsAgent: agent,
			baseURL: BASE_URL,
			method: "GET",
			auth: { username, password },
			responseType: "json",
			transformResponse: this.transformResponse.bind(this), // overrides axios' default transformer
			headers: {
				Accept: "application/json",
				AccessKey: accessKey,
			},
		});
	}

	protected request<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): AxiosPromise<T> {
		return this.axios.request<T>(Object.assign({}, { url }, config));
	}

	private transformResponse(data: any, headers?: AxiosResponseHeaders): any {
		if (!headers) throw new Error("Server did not return response headers");

		const contentType = headers["content-type"];
		if (!/application\/json/.test(contentType)) {
			throw new Error(
				`Server responsed with unexpected content type: ${contentType}`
			);
		}

		return JSON.parse(data);
	}
}

export interface ClientOptions {
	username: string;
	password: string;
	accessKey: string;

	agent?: Agent | AgentOptions;
}
