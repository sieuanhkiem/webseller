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
const inventory_1 = require("../entity/inventory");
const address_service_1 = __importDefault(require("./address.service"));
class InventoryService extends base_service_1.default {
    constructor() {
        super(...arguments);
        this.addressService = new address_service_1.default();
    }
    GetInventories(productCode, sizeCode, colorCode, addressCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const address = yield this.addressService.FindAddressByCode(addressCode);
                yield _super.connectDatabase.call(this);
                const repositoryInventory = _super.createRepository.call(this, inventory_1.Inventory);
                const selectInventory = yield repositoryInventory.createQueryBuilder('inventory')
                    .innerJoin('inventory.product', 'product')
                    .innerJoin('inventory.product_size', 'product_size')
                    .innerJoin('inventory.product_color', 'product_color')
                    .where('product_size.size_code = :sizeCode and product.product_code = :productCode and product_color.color_code = :colorCode and inventory.quantity > 0', { sizeCode, productCode, colorCode });
                if (address != null) {
                    const inventories = yield selectInventory
                        .innerJoin('inventory.shop', 'shop')
                        .innerJoin('shop.address', 'address')
                        .innerJoin('address.city', 'city')
                        .innerJoin('address.district', 'district')
                        .where('(district.district_code = :districtCode or city.city_code = :cityCode)', { districtCode: address.district.district_code, cityCode: address.city.city_code })
                        .andWhere('product_size.size_code = :sizeCode and product.product_code = :productCode and product_color.color_code = :colorCode and inventory.quantity > 0', { sizeCode, productCode, colorCode })
                        .getMany();
                    if (inventories.length > 0) {
                        yield _super.disconnectDatabase.call(this);
                        return inventories;
                    }
                }
                const inventories = yield selectInventory.getMany();
                yield _super.disconnectDatabase.call(this);
                return inventories;
            }
            catch (error) {
                logging_1.logging.error(`[${InventoryService.name}].[${this.GetInventories.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    UpdateInventory(inventory) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryInventory = _super.createRepository.call(this, inventory_1.Inventory);
                const inventoryUpdate = yield repositoryInventory.save(inventory);
                yield _super.disconnectDatabase.call(this);
                return inventoryUpdate;
            }
            catch (error) {
                logging_1.logging.error(`[${InventoryService.name}].[${this.UpdateInventory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    Rollback() {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            Rollback: { get: () => super.Rollback },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                yield _super.Rollback.call(this);
                yield _super.disconnectDatabase.call(this);
            }
            catch (error) {
                logging_1.logging.error(`[${InventoryService.name}].[${this.Rollback.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
            }
        });
    }
}
exports.default = InventoryService;
