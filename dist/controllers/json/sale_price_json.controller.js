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
const sale_price_service_1 = __importDefault(require("../../services/sale_price.service"));
class SalePriceJsonController {
    static SalePriceBySizeCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCode = req.body.product_code || '';
                const sizeCode = req.body.size_code || '';
                const salePrice = yield SalePriceJsonController.salePriceService.GetSalePriceBySizeCode(productCode, sizeCode);
                if (salePrice == null)
                    throw new Error(`Can not find sale price of product size ${sizeCode}`);
                return res.json({
                    code: 200,
                    result: common_extendsion_1.Common.encrypt(salePrice)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.SalePriceBySizeCode.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
    static InsertSalePriceAndSize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizePriceEncrypt = req.body.size_price || null;
                if (sizePriceEncrypt == null)
                    throw new Error('Can not found size price request');
                const sizePrice = common_extendsion_1.Common.decrypt(sizePriceEncrypt);
                const salePrice = yield SalePriceJsonController.salePriceService.InsertSalePriceAndSize(sizePrice);
                if (salePrice == null)
                    throw new Error('Insert sale price and size product faild');
                return res.json({
                    code: 200,
                    salePrice: common_extendsion_1.Common.encrypt(salePrice)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.InsertSalePriceAndSize}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
    static DeleteSizeAndPrice(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sizePriceEncrypt = req.body.size_price || null;
                if (sizePriceEncrypt == null)
                    throw new Error('Can not found size price request');
                const sizePrice = common_extendsion_1.Common.decrypt(sizePriceEncrypt);
                const resultDelete = yield SalePriceJsonController.salePriceService.DeleteSalePriceProduct(sizePrice);
                if (resultDelete == false)
                    throw new Error(`Delete size product by code ${sizePrice.size_code} faild`);
                return res.json({
                    code: 200,
                    responseText: 'Delete size và giá thành công'
                });
            }
            catch (error) {
                logging_1.logging.error(`[${SalePriceJsonController.name}].[${SalePriceJsonController.DeleteSizeAndPrice}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
}
SalePriceJsonController.salePriceService = new sale_price_service_1.default();
exports.default = SalePriceJsonController;
