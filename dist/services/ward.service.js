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
const base_service_1 = __importDefault(require("./base.service"));
const logging_1 = require("../config/logging");
const ward_1 = require("../entity/ward");
class WardService extends base_service_1.default {
    GetWardByDistrictCodeAndCityCode(districtCode, cityCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryWard = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(ward_1.Ward);
                const wards = yield repositoryWard.createQueryBuilder('ward')
                    .innerJoin('ward.district', 'district')
                    .innerJoin('ward.city', 'city')
                    .where('city.city_code = :cityCode and district.district_code = :districtCode', { cityCode, districtCode })
                    .getMany();
                yield _super.disconnectDatabase.call(this);
                return wards;
            }
            catch (error) {
                logging_1.logging.error(`[${WardService.name}].[${this.GetWardByDistrictCodeAndCityCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    GetWardByCode(wardCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const ward = yield ward_1.Ward.findOneOrFail({
                    where: {
                        ward_code: wardCode
                    }
                });
                yield _super.disconnectDatabase.call(this);
                return ward;
            }
            catch (error) {
                logging_1.logging.error(`[${WardService.name}].[${this.GetWardByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
}
exports.default = WardService;
