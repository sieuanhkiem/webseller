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
const common_extendsion_1 = require("../common/common_extendsion");
const customer_1 = require("../entity/customer");
const city_service_1 = __importDefault(require("../services/city.service"));
const district_service_1 = __importDefault(require("../services/district.service"));
const ward_service_1 = __importDefault(require("../services/ward.service"));
const address_service_1 = __importDefault(require("../services/address.service"));
class CustomerService extends base_service_1.default {
    GetCustomerByCode(customerCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const customer = yield customer_1.Customer.findOneOrFail({
                    where: {
                        customer_code: customerCode,
                    },
                    relations: {
                        address: true
                    }
                });
                yield _super.disconnectDatabase.call(this);
                console.log(customer);
                return customer;
            }
            catch (error) {
                logging_1.logging.error(`[${CustomerService.name}].[${this.GetCustomerByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    createCustomer(postDelivery) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cityService = new city_service_1.default();
                const city = (yield cityService.GetCityByCode(postDelivery.city)) || null;
                const districtService = new district_service_1.default();
                const district = (yield districtService.GetDistrictByCode(postDelivery.district)) || null;
                const wardService = new ward_service_1.default();
                const ward = (yield wardService.GetWardByCode(postDelivery.ward)) || null;
                const addressService = new address_service_1.default();
                let address = yield addressService.FindAddress(city.city_code, district.district_code, ward.ward_code, postDelivery.address);
                if (address == null)
                    address = (yield addressService.CreateAddress(city, district, ward, postDelivery.address)) || null;
                yield _super.connectDatabase.call(this);
                const repositoryCustomer = _super.createRepository.call(this, customer_1.Customer);
                let customerSave = new customer_1.Customer();
                customerSave.telephone1 = postDelivery.telephone;
                customerSave.customer_code = postDelivery.code;
                customerSave.customer_name = postDelivery.fullname;
                customerSave.sex = common_extendsion_1.Common.booleanify(postDelivery.sex);
                customerSave.address = address;
                customerSave.age = new Date().getFullYear() - new Date(postDelivery.birthdate).getFullYear();
                yield repositoryCustomer.save(customerSave);
                yield _super.disconnectDatabase.call(this);
                console.log(customerSave);
                return customerSave;
            }
            catch (error) {
                logging_1.logging.error(`[${CustomerService.name}].[${this.createCustomer.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
}
exports.default = CustomerService;
