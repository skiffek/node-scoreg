import Client from "../client";
export default class MemberV2 extends Client {
    findScoutIdsForOrganization(): Promise<string[]>;
    findMemberByScoutId(scoutId: string): Promise<Member>;
    findMemberCompleteByScoutId(scoutId: string): Promise<MemberComplete>;
}
export interface Job {
    code: string;
    memberCode: string;
    memberName: string;
    jobCode: string;
    jobAbbreviation: string;
    jobName: string;
    organizationCode: string;
    organizationName: string;
    startDate?: string;
    endDate?: string;
}
export interface Event {
    eventCode: string;
    eventName: string;
    eventLocation?: string;
    memberCode: string;
    memberName: string;
    attendanceType?: "ATTENDEE" | "STAFF";
    attendanceState?: "REGISTERED" | "COMPLETED" | "PARTICIPATED";
    attendanceDate?: string;
    jobTitle?: string;
}
export interface Award {
    awardCode: string;
    awardName: string;
    memberCode: string;
    memberName: string;
    awardingDate?: string;
    description?: string;
    section?: string;
}
export interface Organization {
    name: string;
    type: "TROOP" | "DIVISION" | "KOLONNE" | "FEDERATION";
    parentOrganization?: string;
    nameAffix?: string;
    abbreviation?: string;
    zvr?: string;
    dvr?: string;
    uidNumber?: string;
    street?: string;
    postcode?: string;
    city?: string;
    province?: string;
    country?: string;
    website?: string;
    phone?: string;
    fax?: string;
    emailPrimary?: string;
    emailSecondary?: string;
    foundationYear?: string;
    leadership?: string;
}
export interface Member {
    scoutId: string;
    scoutState: "MEMBER_FULL" | "CONTACT";
    username: string;
    password: void;
    prefixTitle?: string;
    postfixTitle?: string;
    firstname?: string;
    secondname?: string;
    lastname: string;
    sex: "MALE" | "FEMALE" | "ORG";
    emailPrimary?: string;
    emailSecondary?: string;
    phoneLine?: string;
    phoneMobile?: string;
    phoneFax?: string;
    street?: string;
    postcode?: string;
    city?: string;
    province?: string;
    country?: string;
    organizationName: string;
    jobList?: string;
    section?: string;
    birthdate?: string;
    dayOfDeath?: string;
    dayOfRetirement?: string;
    parents: {
        motherName?: string;
        motherPhone?: string;
        motherEmail?: string;
        motherProfession?: string;
        motherAddress?: string;
        fatherName?: string;
        fatherPhone?: string;
        fatherEmail?: string;
        fatherProfession?: string;
        fatherAddress?: string;
    };
    dynamicField1?: string;
    dynamicField2?: string;
    dynamicField3?: string;
    dynamicField4?: string;
    dynamicField5?: string;
}
export interface MemberComplete extends Member {
    organization: Organization;
    memberPortrait: {
        name?: string;
        fileData?: string;
    };
    memberJobList: Array<Job>;
    memberEventList: Array<Event>;
    memberAwardList: Array<Award>;
}
