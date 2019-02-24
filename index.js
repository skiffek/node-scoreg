const BASE_URL = "https://www.scoreg.at/ScoregWebServer/services/v1";

const fetch = require("node-fetch");

module.exports = class Scoreg {
	/**
	 * @constructor
	 * @param {String} username
	 * @param {String} password
	 * @param {String} accessKey
	 * @param {Object} [options={}] - Options for {@link https://www.npmjs.com/package/node-fetch node-fetch}
	 */
	constructor(username, password, accessKey, options = {}) {
		this.username = username;
		this.password = password;
		this.accessKey = accessKey;
		this.options = options;
	}

	/**
	 * @protected
	 * @param {String} path - Path to fetch, relative to BASE_URL
	 * @param {Object} [options={}] - Options for {@link https://www.npmjs.com/package/node-fetch node-fetch}
	 * @return {Promise<*>}
	 */
	async fetch(path, options = {}) {
		options = Object.assign({}, this.options, options);

		if (!(options.headers instanceof fetch.Headers))
			options.headers = new fetch.Headers(options.headers);

		options.headers.set("Accept", "application/json");
		options.headers.set("AccessKey", this.accessKey);
		options.headers.set("Authorization", [
			"Basic", Buffer.from(`${this.username}:${this.password}`, "ascii").toString("base64")
		].join(" "));

		return fetch(`${BASE_URL}/${path.replace(/^\//, "")}`, options).then(response => {
			if (!response.ok)
				throw new Error(response.statusText);

			return response.json();
		});
	}

	/**
	 * @return {Promise<String[]>}
	 */
	async findScoutIdsForOrganization() {
		return this.fetch("/memberV2/findScoutIdsForOrganization/").then(content => content.list);
	}

	/**
	 * @param {String} scoutId
	 * @return {Promise<Object>}
	 */
	async findMemberByScoutId(scoutId) {
		return this.fetch(`/memberV2/findMemberByScoutId/${scoutId}/`);
	}

	/**
	 * @param {String} scoutId
	 * @return {Promise<Object>}
	 */
	async findMemberCompleteByScoutId(scoutId) {
		return this.fetch(`/memberV2/findMemberCompleteByScoutId/${scoutId}/`);
	}
};
