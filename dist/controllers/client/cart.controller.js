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
class CartController {
    static ShowCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = req.session.cart || { totalPrice: 0, cartItem: [], totalItem: 0 };
                // console.log(cart);
                const category = yield CartController.categoryService.GetAllCategory();
                const categoriesWithProduct = yield CartController.categoryService.GetProductWithCategory();
                return res.render('./client/cart.ejs', { cart, category, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${CartController.name}].[${CartController.ShowCart.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
}
CartController.categoryService = new category_service_1.default();
exports.default = CartController;
