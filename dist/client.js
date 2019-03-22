"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const axios_1 = __importDefault(require("axios"));
exports.BASE_URL = "https://www.scoreg.at/ScoregWebServer/services/v1";
class Client {
    constructor({ username, password, accessKey, agent = { keepAlive: true } }) {
        if (!(agent instanceof https_1.Agent))
            agent = new https_1.Agent(agent);
        this.axios = axios_1.default.create({
            httpsAgent: agent,
            baseURL: exports.BASE_URL,
            method: "GET",
            auth: { username, password },
            responseType: "json",
            transformResponse: this.transformResponse.bind(this),
            headers: {
                "Accept": "application/json",
                "AccessKey": accessKey,
            },
        });
    }
    request(url, config) {
        return this.axios.request(Object.assign({}, { url }, config));
    }
    transformResponse(data, headers) {
        if (!/application\/json/.test(headers["content-type"]))
            throw new Error("Server responsed with unexpected content type: " + headers["content-type"]);
        return JSON.parse(data);
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map