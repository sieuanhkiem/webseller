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
const product_size_1 = require("../entity/product_size");
class ProductSizeService extends base_service_1.default {
    FindProductSizeByCode(sizeCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const productSizeCode = yield product_size_1.ProductSize.findOneOrFail({
                    where: {
                        size_code: sizeCode
                    }
                });
                yield _super.disconnectDatabase.call(this);
                // console.log(productSizeCode);
                return productSizeCode;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductSizeService.name}].[${this.FindProductSizeByCode.name}]: ${error}`);
                return null;
            }
        });
    }
}
exports.default = ProductSizeService;
