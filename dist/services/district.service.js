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
const district_1 = require("../entity/district");
class DistrictService extends base_service_1.default {
    GetDistrictByCityCode(cityCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const districtRepository = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(district_1.District);
                const districts = yield districtRepository.createQueryBuilder('district')
                    .innerJoin('district.city', 'city')
                    .where('city.city_code= :cityCode', { cityCode })
                    .getMany();
                yield _super.disconnectDatabase.call(this);
                return districts;
            }
            catch (error) {
                logging_1.logging.error(`[${DistrictService.name}].[${this.GetDistrictByCityCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    GetDistrictByCode(districtCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const districts = yield district_1.District.findOneOrFail({
                    where: {
                        district_code: districtCode
                    }
                });
                yield _super.disconnectDatabase.call(this);
                return districts;
            }
            catch (error) {
                logging_1.logging.error(`[${DistrictService.name}].[${this.GetDistrictByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
}
exports.default = DistrictService;
