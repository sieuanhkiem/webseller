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
const config_1 = __importDefault(require("../../config/config"));
const product_service_1 = __importDefault(require("../../services/product.service"));
const category_service_1 = __importDefault(require("../../services/category.service"));
const order_1 = require("../../enum/order");
class CategoryController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const page = parseInt(req.params.page || '1');
                const order = (req.params.order || order_1.Order.ASC);
                const categoryCode = req.params.categorycode;
                const categoriesProduct = yield CategoryController.categoryService.GetAllCategory();
                if (categoriesProduct == null || categoriesProduct == undefined)
                    throw Error('Category can not query');
                const currentCategory = categoriesProduct.find(category => category.category_code == categoryCode);
                if (currentCategory == null || currentCategory == undefined)
                    throw new Error('Category code is not found');
                const productPagination = yield CategoryController.productService.GetProductByNumberPage(page, config_1.default.quantityofpage, categoryCode, order);
                const categoriesWithProduct = yield CategoryController.categoryService.GetProductWithCategory();
                return res.render('./client/category.ejs', { product: productPagination, category: { categoriesProduct, currentCategory }, quantityOfPage: config_1.default.quantityofpage, order, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryController.name}].[${CategoryController.index.name}]: ${error}`);
                res.redirect('/page_error');
            }
        });
    }
}
CategoryController.productService = new product_service_1.default();
CategoryController.categoryService = new category_service_1.default();
exports.default = CategoryController;
