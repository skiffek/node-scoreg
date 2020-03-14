"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
class MemberV2 extends client_1.default {
    findScoutIdsForOrganization() {
        return __awaiter(this, void 0, void 0, function* () {
            const pathname = "/memberV2/findScoutIdsForOrganization/";
            const response = yield this.request(pathname);
            if (!Array.isArray(response.data.list))
                throw new Error("Server didn't respond with a list array");
            return response.data.list;
        });
    }
    findMemberByScoutId(scoutId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathname = `/memberV2/findMemberByScoutId/${encodeURIComponent(scoutId)}/`;
            const response = yield this.request(pathname);
            if ("object" !== typeof response.data)
                throw new Error("Server didnt respons with an object");
            return response.data;
        });
    }
    findMemberCompleteByScoutId(scoutId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathname = `/memberV2/findMemberCompleteByScoutId/${encodeURIComponent(scoutId)}/`;
            const response = yield this.request(pathname);
            if ("object" !== typeof response.data)
                throw new Error("Server didnt respons with an object");
            return response.data;
        });
    }
}
exports.default = MemberV2;
//# sourceMappingURL=member-v2.js.map