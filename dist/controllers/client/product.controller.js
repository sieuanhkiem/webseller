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
const product_service_1 = __importDefault(require("../../services/product.service"));
const category_service_1 = __importDefault(require("../../services/category.service"));
class ProductController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productCode = req.params.productcode || null;
                if (productCode == null)
                    throw new Error('Can not find product code');
                const productDetail = yield ProductController.productService.GetDetailsProduct(productCode);
                if (productDetail == null || productDetail == undefined)
                    throw new Error(`Can not find product by ${productCode}`);
                const productRand = yield ProductController.productService.GetRandomProduct();
                const category = yield ProductController.categoryService.GetAllCategory();
                const categoriesWithProduct = yield ProductController.categoryService.GetProductWithCategory();
                return res.render('./client/product.ejs', { productDetail, productRand, category, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${ProductController.name}].[${ProductController.index.name}]: ${error}`);
                res.redirect('/page_error');
            }
        });
    }
}
ProductController.productService = new product_service_1.default();
ProductController.categoryService = new category_service_1.default();
exports.default = ProductController;
