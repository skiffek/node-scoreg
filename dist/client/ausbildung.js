"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
class Ausbildung extends client_1.default {
    findScoutIdsForOrganization() {
        return __awaiter(this, void 0, void 0, function* () {
            const pathname = "/ausbildung/findScoutIdsForOrganization/";
            const response = yield this.request(pathname);
            if (!Array.isArray(response.data.list))
                throw new Error("Server didn't respond with a list array");
            return response.data.list;
        });
    }
    findMemberByScoutId(scoutId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pathname = `/ausbildung/findMemberByScoutId/${encodeURIComponent(scoutId)}/`;
            const response = yield this.request(pathname);
            return response.data;
        });
    }
}
exports.default = Ausbildung;
//# sourceMappingURL=ausbildung.js.map