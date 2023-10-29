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
const logging_1 = require("../../config/logging");
const common_extendsion_1 = require("../../common/common_extendsion");
const district_service_1 = __importDefault(require("../../services/district.service"));
class DistrictJsonController {
    static GetDistrictByCityCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cityCode = req.body.city_code || null;
                if (cityCode == null)
                    throw new Error('city code not found in body not found');
                const districts = yield DistrictJsonController.districtService.GetDistrictByCityCode(cityCode);
                return res.json({
                    code: 200,
                    districts: common_extendsion_1.Common.encrypt(districts)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${DistrictJsonController.name}].[${DistrictJsonController.GetDistrictByCityCode.name}]: ${error}`);
                res.json({
                    code: 500,
                    error: error.stack
                });
            }
        });
    }
}
DistrictJsonController.districtService = new district_service_1.default();
exports.default = DistrictJsonController;
