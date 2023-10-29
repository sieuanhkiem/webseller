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
const sales_order_1 = require("../entity/sales_order");
const entity_1 = require("../enum/entity");
class SaleOrderService extends base_service_1.default {
    CreateSaleOrder(saleOrder) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase },
            Rollback: { get: () => super.Rollback }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySaleOrder = _super.createRepository.call(this, sales_order_1.SalesOrder);
                saleOrder.transaction_number = `SAL_${new Date().formatTime('YYYYMMDDHHmmss')}_${(yield repositorySaleOrder.count()) + 1}`;
                const saleOrderNew = yield repositorySaleOrder.save(saleOrder);
                yield _super.disconnectDatabase.call(this);
                return saleOrderNew;
            }
            catch (error) {
                logging_1.logging.error(`[${SaleOrderService.name}].[${this.CreateSaleOrder.name}]: ${error}`);
                yield _super.Rollback.call(this);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    GetSaleOrderByCustomerCode(customerCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySaleOrder = _super.createRepository.call(this, sales_order_1.SalesOrder);
                const saleOrders = yield repositorySaleOrder.createQueryBuilder('sale_order')
                    .innerJoin('sale_order.customer', 'customer')
                    .where('customer.customer_code = :customerCode and sale_order.status = :status', { customerCode, status: entity_1.SalerOrderStatus.NHAP })
                    .setFindOptions({
                    relations: {
                        product: true,
                        inventory: {
                            product_size: true
                        },
                        customer: {
                            address: true
                        }
                    }
                })
                    .getMany();
                yield _super.disconnectDatabase.call(this);
                return saleOrders;
            }
            catch (error) {
                logging_1.logging.error(`[${SaleOrderService.name}].[${this.GetSaleOrderByCustomerCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    UpdateSaleOrder(saleOrder) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySaleOrder = _super.createRepository.call(this, sales_order_1.SalesOrder);
                const saleOrderUpdate = yield repositorySaleOrder.save(saleOrder);
                yield _super.disconnectDatabase.call(this);
                return saleOrderUpdate;
            }
            catch (error) {
                logging_1.logging.error(`[${SaleOrderService.name}].[${this.UpdateSaleOrder.name}]: ${error}`);
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
                logging_1.logging.error(`[${SaleOrderService.name}].[${this.Rollback.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
            }
        });
    }
}
exports.default = SaleOrderService;
