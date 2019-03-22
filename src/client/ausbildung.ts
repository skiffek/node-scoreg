import Client from "../client";

export default class Ausbildung extends Client {
	public async findScoutIdsForOrganization(): Promise<string[]> {
		const pathname = "/ausbildung/findScoutIdsForOrganization/";
		const response = await this.request<{ list: string[]}>(pathname);

		if (!Array.isArray(response.data.list))
			throw new Error("Server didn't respond with a list array");

		return response.data.list;
	}

	public async findMemberByScoutId(scoutId: string): Promise<any> {
		const pathname = `/ausbildung/findMemberByScoutId/${encodeURIComponent(scoutId)}/`;
		const response = await this.request<any>(pathname);

		return response.data;
	}
}
