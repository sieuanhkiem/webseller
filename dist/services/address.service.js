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
const address_2 = require("../entity/address");
class AddressService extends base_service_1.default {
    CreateAddress(city, district, ward, address) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryAddress = _super.createRepository.call(this, address_2.Address);
                let addressNew = new address_2.Address();
                addressNew.address_1 = address;
                addressNew.address_code = `ADSS_${new Date().formatTime('YYYYMMDDHHmmss')}_${(yield address_2.Address.count()) + 1}`;
                addressNew.city = city;
                addressNew.district = district;
                addressNew.ward = ward;
                addressNew = yield repositoryAddress.save(addressNew);
                yield _super.disconnectDatabase.call(this);
                return addressNew;
            }
            catch (error) {
                logging_1.logging.error(`[${AddressService.name}].[${this.CreateAddress.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    UpdateAddress(address) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryAddress = _super.createRepository.call(this, address_2.Address);
                const addressUpdate = yield repositoryAddress.save(address);
                yield _super.disconnectDatabase.call(this);
                return addressUpdate;
            }
            catch (error) {
                logging_1.logging.error(`[${AddressService.name}].[${this.UpdateAddress.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    FindAddressByCode(addressCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const address = yield address_2.Address.findOneOrFail({
                    where: {
                        address_code: addressCode
                    },
                    relations: {
                        city: true,
                        district: true
                    }
                });
                yield _super.disconnectDatabase.call(this);
                return address;
            }
            catch (error) {
                logging_1.logging.error(`[${AddressService.name}].[${this.FindAddressByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    FindAddress(cityCode, districtCode, wardCode, addressDetail) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const address = yield address_2.Address.findOneOrFail({
                    where: {
                        city: {
                            city_code: cityCode
                        },
                        district: {
                            district_code: districtCode
                        },
                        ward: {
                            ward_code: wardCode
                        },
                        address_1: addressDetail
                    }
                });
                _super.disconnectDatabase.call(this);
                return address;
            }
            catch (error) {
                logging_1.logging.error(`[${AddressService.name}].[${this.FindAddress.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
}
exports.default = AddressService;
