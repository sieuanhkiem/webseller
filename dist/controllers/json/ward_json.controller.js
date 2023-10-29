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
const ward_service_1 = __importDefault(require("../../services/ward.service"));
class WardJsonController {
    static GetWardByDistrictCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const districtCode = req.body.district_code || null;
                const cityCode = req.body.city_code || null;
                if (districtCode == null)
                    throw new Error('can not find district code in body');
                if (cityCode == null)
                    throw new Error('can not find city code in body');
                const wards = yield WardJsonController.wardService.GetWardByDistrictCodeAndCityCode(districtCode, cityCode);
                return res.json({
                    code: 200,
                    wards: common_extendsion_1.Common.encrypt(wards)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${WardJsonController.name}].[${WardJsonController.GetWardByDistrictCode.name}]: ${error}`);
                res.json({
                    code: 500,
                    error: error.stack
                });
            }
        });
    }
}
WardJsonController.wardService = new ward_service_1.default();
exports.default = WardJsonController;
