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
const sales_price_1 = require("../entity/sales_price");
const base_service_1 = __importDefault(require("./base.service"));
const logging_1 = require("../config/logging");
const product_size_1 = require("../entity/product_size");
const product_1 = require("../entity/product");
const common_extendsion_1 = require("../common/common_extendsion");
class SalePriceService extends base_service_1.default {
    GetSalePriceBySizeCode(productCode, sizeCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySalePrice = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(sales_price_1.SalesPrice);
                const salePrice = yield repositorySalePrice.createQueryBuilder('sale_price')
                    .innerJoin('sale_price.product_size', 'product_size')
                    .innerJoin('sale_price.product', 'product')
                    .where('product_size.size_code = :sizeCode and product.product_code = :productCode', { sizeCode, productCode })
                    .setFindOptions({
                    relations: {
                        product_size: true
                    }
                })
                    .getOneOrFail();
                // console.log(salePrice);
                yield _super.disconnectDatabase.call(this);
                return salePrice;
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceService.name}].[${this.GetSalePriceBySizeCode.name}]: ${error}`);
                return null;
            }
        });
    }
    FindSalePriceByCode(salePriceCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const salePrice = yield sales_price_1.SalesPrice.findOneOrFail({
                    where: {
                        sale_code: salePriceCode
                    }
                });
                yield _super.disconnectDatabase.call(this);
                return salePrice;
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceService.name}].[${this.FindSalePriceByCode.name}]: ${error}`);
                return null;
            }
        });
    }
    GetSalePriceByProduct(productCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySalePrice = _super.createRepository.call(this, sales_price_1.SalesPrice);
                const salePrices = yield repositorySalePrice.createQueryBuilder('salePrice')
                    .innerJoin('salePrice.product', 'product')
                    .where('product.product_code = :productCode', { productCode })
                    .setFindOptions({
                    relations: {
                        product_size: true,
                        product: true
                    }
                })
                    .getMany();
                yield _super.disconnectDatabase.call(this);
                return salePrices;
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceService.name}].[${this.GetSalePriceByProduct}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    InsertSalePriceAndSize(sizePriceNew) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySalePrice = _super.createRepository.call(this, sales_price_1.SalesPrice);
                const repositoryProductSize = _super.createRepository.call(this, product_size_1.ProductSize);
                const repositoryProduct = _super.createRepository.call(this, product_1.Product);
                const product = yield repositoryProduct.createQueryBuilder('product')
                    .where('product.product_code = :productCode', { productCode: sizePriceNew.product_code })
                    .getOneOrFail();
                const countSize = yield repositoryProductSize.count();
                let productSize = new product_size_1.ProductSize();
                productSize.size_name = sizePriceNew.size_name;
                productSize.size_code = `SIZ-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(countSize + 1, 6)}`;
                productSize.product = product;
                productSize = yield repositoryProductSize.save(productSize);
                const countSale = yield repositorySalePrice.count();
                let salePrice = new sales_price_1.SalesPrice();
                salePrice.sale_price = sizePriceNew.sale_price;
                salePrice.sale_code = `SAL-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(countSale + 1, 6)}`;
                salePrice.product = product;
                salePrice.product_size = productSize;
                salePrice = yield repositorySalePrice.save(salePrice);
                yield _super.disconnectDatabase.call(this);
                return salePrice;
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceService.name}].[${this.InsertSalePriceAndSize}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    DeleteSalePriceProduct(sizePriceDelete) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositorySalePrice = _super.createRepository.call(this, sales_price_1.SalesPrice);
                const repositoryProductSize = _super.createRepository.call(this, product_size_1.ProductSize);
                let checkSalePrice = false;
                let checkProductSize = false;
                const deleteSalePrice = yield repositorySalePrice.createQueryBuilder().delete()
                    .where('sale_code= :saleCode', { saleCode: sizePriceDelete.sale_code })
                    .execute();
                const deleteProductSize = yield repositoryProductSize.createQueryBuilder().delete()
                    .where('size_code = :sizeCode', { sizeCode: sizePriceDelete.size_code })
                    .execute();
                checkSalePrice = deleteSalePrice.affected != null && deleteSalePrice.affected > 0;
                checkProductSize = deleteProductSize.affected != null && deleteProductSize.affected > 0;
                yield _super.disconnectDatabase.call(this);
                return checkSalePrice && checkProductSize;
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceService.name}].[${this.DeleteSalePriceProduct.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
}
exports.default = SalePriceService;
