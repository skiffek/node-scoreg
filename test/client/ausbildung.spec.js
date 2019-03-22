const { expect } = require("chai");
const MockAdapter = require("axios-mock-adapter");

const { Ausbildung } = require("../..");

describe("Ausbildung", () => {
	const list = [ "0-12345.FOO", "0-12345.BAR" ];
	const member = {
		scoutId: "0-12345.FOO",
		scoutState: "FULL_MEMBER",
		username: "username",
		password: null,
		lastname: "lastname",
		sex: "ORG",
		organizationName: "organizationName",
		parents: {},
	};

	const headers = { "content-type": "application/json" };
	const client = new Ausbildung({
		username: "fakeUsername",
		password: "fakePassword",
		accessKey: "fakeAccessKey",
	});

	const mock = new MockAdapter(client.axios);

	afterEach(() => mock.reset());

	describe("findScoutIdsForOrganization()", () => {
		it("resolves on normal operation", async () => {
			mock.onAny().reply(200, JSON.stringify({ list }), headers);

			await expect(client.findScoutIdsForOrganization()).to.eventually.eql(list);
		});

		it("rejects when response doesn't have a list", async () => {
			mock.onAny().reply(200, JSON.stringify({}), headers);

			await expect(client.findScoutIdsForOrganization()).to.eventually.be.rejected;
		});

		it("rejects when response has list that is not an array", async () => {
			mock.onAny().reply(200, JSON.stringify({ list: false }), headers);

			await expect(client.findScoutIdsForOrganization()).to.eventually.be.rejected;
		});
	});

	describe("findMemberByScoutId()", () => {
		it("resolve on normal operation", async () => {
			mock.onAny().reply(200, JSON.stringify(member), headers);

			await expect(client.findMemberByScoutId(member.scoutId)).to.eventually.be.eql(member);
		});
	});
});
