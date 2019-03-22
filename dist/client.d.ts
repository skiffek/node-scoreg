/// <reference types="node" />
import { Agent, AgentOptions } from "https";
import { AxiosRequestConfig, AxiosPromise } from "axios";
export declare const BASE_URL = "https://www.scoreg.at/ScoregWebServer/services/v1";
export default abstract class Client {
    private readonly axios;
    constructor({ username, password, accessKey, agent }: ClientOptions);
    protected request<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    private transformResponse;
}
export interface ClientOptions {
    username: string;
    password: string;
    accessKey: string;
    agent?: Agent | AgentOptions;
}
