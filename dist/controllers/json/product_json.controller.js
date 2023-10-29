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
const product_service_1 = __importDefault(require("../../services/product.service"));
class ProductJsonController {
    static InsertProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strJsonEncrypt = req.body.product || null;
                if (strJsonEncrypt == null)
                    throw new Error('Can not found product request');
                const productInsert = common_extendsion_1.Common.decrypt(strJsonEncrypt);
                const productNew = yield ProductJsonController.productService.InsertProduct(productInsert);
                if (productNew == false)
                    throw new Error('Create product faild');
                return res.json({
                    code: 200,
                    product: common_extendsion_1.Common.encrypt(productNew)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductJsonController.name}].[${ProductJsonController.InsertProduct.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
    static DeleteImageAndColorOfProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strJsonEncrypt = req.body.product || null;
                if (strJsonEncrypt == null)
                    throw new Error('Can not found product request');
                const productUpdate = common_extendsion_1.Common.decrypt(strJsonEncrypt);
                const result = yield ProductJsonController.productService.DeleteImageAndColorProduct(productUpdate);
                if (result == false)
                    throw new Error(`Delete image and color of product ${productUpdate.product_code} faild`);
                return res.json({
                    code: 200,
                    responseText: 'Delete success'
                });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductJsonController.name}].[${ProductJsonController.DeleteImageAndColorOfProduct.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
    static UpdateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strJsonEncrypt = req.body.product || null;
                if (strJsonEncrypt == null)
                    throw new Error('Can not found product request');
                const productUpdate = common_extendsion_1.Common.decrypt(strJsonEncrypt);
                const product = yield ProductJsonController.productService.UpdateProduct(productUpdate);
                if (product == null)
                    throw new Error(`Update product by code ${productUpdate.product_code} faild`);
                return res.json({
                    code: 200,
                    product: common_extendsion_1.Common.encrypt(product)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductJsonController.name}].[${ProductJsonController.UpdateProduct.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
    static DeleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCodeEncrypt = req.body.product_code || null;
                if (productCodeEncrypt == null)
                    throw new Error('Can not found product code request');
                const productCode = common_extendsion_1.Common.decrypt(productCodeEncrypt);
                const result = yield ProductJsonController.productService.DeleteProduct(productCode);
                if (result == false)
                    throw new Error(`Delete product by code ${productCode} faild`);
                return res.json({
                    code: 200,
                    responseText: 'Delete thành công'
                });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductJsonController.name}].[${ProductJsonController.DeleteProduct.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack
                });
            }
        });
    }
}
ProductJsonController.productService = new product_service_1.default();
exports.default = ProductJsonController;
