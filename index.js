const BASE_URL = "https://www.scoreg.at/ScoregWebServer/services/v1";

const https = require("https");
const fetch = require("node-fetch");

module.exports = class Scoreg {
	/**
	 * @param String username
	 * @param String password
	 * @param String accessKey
	 * @param Object options for node-fetch
	 */
	constructor(username, password, accessKey, options = {}) {
		this.username = username;
		this.password = password;
		this.accessKey = accessKey;
		
		this.options = Object.assign({
			agent: new https.Agent({ keepAlive: true, maxSockets: 8 }),
		}, options);
	}
	
	/**
	 * @param String path relative to BASE_URL
	 * @param Object options for node-fetch
	 * @return Promise<Object>
	 */
	fetch(path, options = {}) {
		options = Object.assign({}, this.options, options);
		
		if (!(options.headers instanceof fetch.Headers))
			options.headers = new fetch.Headers(options.headers);

		options.headers.set("accessKey", this.accessKey);
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
	 * @return Promise<Array>
	 */
	findScoutIdsForOrganization() {
		return this.fetch(`/memberV2/findScoutIdsForOrganization/`).then(content => content.list);
	}
	
	/**
	 * Convenience method that calls <code>findScoutIdsForOrganization()</code> and then
	 * for each scoutId <code>findMemberByScoutId(scoutId)</code>.
	 * 
	 * @return Promise<Array>
	 */
	findMembersForOrganization() {
		return this.findScoutIdsForOrganization().then(scoutIds => {
			return Promise.all(scoutIds.map(scoutId => this.findMemberByScoutId(scoutId)));
		});
	}
	
	/**
	 * @param String scoutId
	 * @return Promise<Object>
	 */
	findMemberByScoutId(scoutId) {
		return this.fetch(`/memberV2/findMemberByScoutId/${scoutId}/`);
	}
	
	/**
	 * @param String scoutId
	 * @return Promise<Object>
	 */
	findMemberCompleteByScoutId(scoutId) {
		return this.fetch(`/memberV2/findMemberCompleteByScoutId/${scoutId}/`);
	}
};