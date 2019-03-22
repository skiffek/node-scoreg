const { expect } = require("chai");
const MockAdapter = require("axios-mock-adapter");

const { default: Client } = require("..");

describe("Client", () => {
	const options = {
		username: "fakeUsername",
		password: "fakePassword",
		accessKey: "fakeAccessKey",
	};

	const client = new Client(options);
	const mock = new MockAdapter(client.axios);

	afterEach(() => mock.reset());

	it("sends proper auth", async () => {
		let headers, auth;

		mock.onAny().reply(request => {
			headers = request.headers;
			auth = request.auth;

			return [ 200 ];
		});

		await client.request("/").catch(() => null);

		expect(headers["AccessKey"]).to.equal(options.accessKey);
		expect(auth).to.include({
			username: options.username,
			password: options.password,
		});
	});

	it("resolves on normal operation", async () => {
		mock.onAny().reply(200, JSON.stringify(options), {
			"content-type": "application/json",
		});

		await expect(client.request("/").then(response => response.data)).to.eventually.eql(options);
	});

	it("rejects when server returns content type other than application/json", async () => {
		mock.onAny().reply(200, "", {
			"content-type": "text/html",
		});

		await expect(client.request("/")).to.eventually.be.rejected;
	});

	it("rejects when server returns invalid JSON", async () => {
		mock.onAny().reply(200, "{{", {
			"content-type": "application/json",
		});

		await expect(client.request("/")).to.eventually.be.rejected;
	});
});
