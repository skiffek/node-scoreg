import Client from "../client";
export default class Ausbildung extends Client {
    findScoutIdsForOrganization(): Promise<string[]>;
    findMemberByScoutId(scoutId: string): Promise<any>;
}
