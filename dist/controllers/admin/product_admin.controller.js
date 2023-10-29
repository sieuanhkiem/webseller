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
const category_service_1 = __importDefault(require("../../services/category.service"));
const product_service_1 = __importDefault(require("../../services/product.service"));
const sale_price_service_1 = __importDefault(require("../../services/sale_price.service"));
class ProductAdminController {
    static EditProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield ProductAdminController.categoryService.GetAllCategory();
                const productCode = req.params.productcode || null;
                if (productCode != null) {
                    let product = yield ProductAdminController.productService.FindProductByCode(productCode);
                    if (product == null)
                        throw new Error(`Can not file product by code ${productCode}`);
                    // console.log(product);
                    return res.render('./admin/product_edit.ejs', { categories, product });
                }
                return res.render('./admin/product_new.ejs', { categories });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductAdminController.name}].[${ProductAdminController.EditProduct.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
    static ListProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductAdminController.productService.GetAllProduct();
                return res.render('./admin/product_list.ejs', { products });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductAdminController.name}].[${ProductAdminController.ListProduct.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
    static SalePriceSize(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCode = req.params.productcode || null;
                if (productCode == null)
                    throw new Error(`Can not found product code request`);
                const product = yield ProductAdminController.productService.FindProductByCode(productCode);
                const salePrices = yield ProductAdminController.salePriceService.GetSalePriceByProduct(productCode);
                if (product == null || product == undefined)
                    throw new Error(`Can not found product by code ${productCode}`);
                return res.render('./admin/size_price.ejs', { product, salePrices });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductAdminController.name}].[${ProductAdminController.SalePriceSize.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
}
ProductAdminController.categoryService = new category_service_1.default();
ProductAdminController.productService = new product_service_1.default();
ProductAdminController.salePriceService = new sale_price_service_1.default();
exports.default = ProductAdminController;
