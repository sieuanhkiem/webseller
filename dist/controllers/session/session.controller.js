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
const product_color_service_1 = __importDefault(require("../../services/product_color.service"));
const sale_price_service_1 = __importDefault(require("../../services/sale_price.service"));
const product_size_service_1 = __importDefault(require("../../services/product_size.service"));
class SessionController {
    static getSessionCart(req, res) {
        // req.session.cart = [
        //     {
        //         itemCode: '1',
        //         quantity: 1,
        //         price: 2000
        //     }
        // ];
        // req.session.save();
        if (!req.session.cart) {
            req.session.cart = {
                totalItem: 0,
                totalPrice: 0,
                cartItem: []
            };
        }
        return res.json({
            cart: common_extendsion_1.Common.encrypt(req.session.cart)
        });
    }
    static pushSessionCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartEncrypt = req.body.cart || null;
                if (cartEncrypt == null)
                    throw Error('Request body is empty');
                let cartItem = common_extendsion_1.Common.decrypt(cartEncrypt);
                if (req.session.cart) {
                    logging_1.logging.info('đã nhận session store');
                    const index = req.session.cart.cartItem.findIndex(product => product.productCode == cartItem.productCode && product.sizeCode == cartItem.sizeCode && product.colorCode == cartItem.colorCode);
                    if (index > -1) {
                        console.log(index);
                        let cartItemCurrent = req.session.cart.cartItem[index];
                        cartItemCurrent.quantity += cartItem.quantity;
                        cartItemCurrent.price += cartItemCurrent.quantity * cartItemCurrent.unitPrice;
                        req.session.cart.cartItem[index] = cartItemCurrent;
                    }
                    else {
                        const product = yield SessionController.productService.FindProductByCode(cartItem.productCode);
                        const productSizeCode = yield SessionController.productSizeSerivce.FindProductSizeByCode(cartItem.sizeCode);
                        const salePrice = yield SessionController.salePriceService.FindSalePriceByCode(cartItem.salePriceCode);
                        cartItem.productName = product.product_name;
                        cartItem.image = product.images_product.filter((imageProduct) => imageProduct.images.image_default == true)[0].images;
                        cartItem.sizeName = productSizeCode.size_name;
                        cartItem.unitPrice = salePrice.sale_price;
                        cartItem.price = salePrice.sale_price * cartItem.quantity;
                        // console.log(cartItem);
                        req.session.cart.cartItem.push(cartItem);
                    }
                }
                else {
                    req.session.cart = {
                        totalItem: 0,
                        totalPrice: 0,
                        cartItem: []
                    };
                    const product = yield SessionController.productService.FindProductByCode(cartItem.productCode);
                    const productSizeCode = yield SessionController.productSizeSerivce.FindProductSizeByCode(cartItem.sizeCode);
                    const salePrice = yield SessionController.salePriceService.FindSalePriceByCode(cartItem.salePriceCode);
                    cartItem.productName = product.product_name;
                    cartItem.image = product.images_product.filter((imageProduct) => imageProduct.images.image_default == true)[0].images;
                    cartItem.sizeName = productSizeCode.size_name;
                    cartItem.unitPrice = salePrice.sale_price;
                    cartItem.price = salePrice.sale_price * cartItem.quantity;
                    req.session.cart.cartItem.push(cartItem);
                }
                req.session.cart.totalItem = req.session.cart.cartItem.reduce(function (count, cartItem) {
                    return count + cartItem.quantity;
                }, 0);
                req.session.cart.totalPrice = req.session.cart.cartItem.reduce(function (totalPrice, cartItem) {
                    return totalPrice + cartItem.price;
                }, 0);
                return res.json({
                    code: 200,
                    cart: common_extendsion_1.Common.encrypt(req.session.cart)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${SessionController.name}].[${SessionController.pushSessionCart.name}]: ${error}`);
                return res.json({ code: 500, error });
            }
        });
    }
    static removeSessionCart(req, res) {
        try {
            const cartEncrypt = req.body.cart || null;
            if (cartEncrypt == null)
                throw Error('Request body is empty');
            let cartItem = common_extendsion_1.Common.decrypt(cartEncrypt);
            if (req.session.cart) {
                if (req.session.cart.cartItem.length > 0) {
                    const index = req.session.cart.cartItem.findIndex(itItem => itItem.productCode == cartItem.productCode && itItem.sizeCode == cartItem.sizeCode && itItem.colorCode == cartItem.colorCode);
                    if (index > -1) {
                        logging_1.logging.info('finded cart to remove cart');
                        req.session.cart.cartItem.splice(index, 1);
                        req.session.cart.totalItem = req.session.cart.cartItem.reduce(function (count, cartItem) {
                            return count + cartItem.quantity;
                        }, 0);
                        req.session.cart.totalPrice = req.session.cart.cartItem.reduce(function (totalPrice, cartItem) {
                            return totalPrice + cartItem.price;
                        }, 0);
                    }
                }
            }
            return res.json({
                code: 200,
                cart: common_extendsion_1.Common.encrypt(req.session.cart)
            });
        }
        catch (error) {
            logging_1.logging.error(`[${SessionController.name}].[${this.removeSessionCart.name}]: ${error}`);
            return res.json({
                code: 500,
                error
            });
        }
    }
    static updateSessionCart(req, res) {
        try {
            const cartEncrypt = req.body.cart || null;
            if (cartEncrypt == null)
                throw new Error('Request cart item is not found');
            const requestCartItem = common_extendsion_1.Common.decrypt(cartEncrypt);
            const index = req.session.cart.cartItem.findIndex((cartItem) => cartItem.productCode == requestCartItem.productCode && cartItem.colorCode == requestCartItem.colorCode && cartItem.sizeCode == requestCartItem.sizeCode);
            if (index > -1) {
                logging_1.logging.info('finded cart item');
                let cartItemCurrent = req.session.cart.cartItem[index];
                cartItemCurrent.quantity = requestCartItem.quantity;
                cartItemCurrent.price = cartItemCurrent.quantity * cartItemCurrent.unitPrice;
                req.session.cart.cartItem[index] = cartItemCurrent;
                req.session.cart.totalItem = req.session.cart.cartItem.reduce(function (count, cartItem) {
                    return count + cartItem.quantity;
                }, 0);
                req.session.cart.totalPrice = req.session.cart.cartItem.reduce(function (totalPrice, cartItem) {
                    return totalPrice + cartItem.price;
                }, 0);
            }
            return res.json({
                code: 200,
                cart: common_extendsion_1.Common.encrypt(req.session.cart)
            });
        }
        catch (error) {
            logging_1.logging.error(`[${SessionController.name}].[${SessionController.updateSessionCart.name}]: ${error}`);
            res.json({
                code: 500,
                error
            });
        }
    }
    static clearCartSession(req, res) {
        if (req.session.cart)
            req.session.cart.cartItem = [];
        else {
            req.session.cart = {
                totalItem: 0,
                totalPrice: 0,
                cartItem: []
            };
        }
        return res.json({
            cart: common_extendsion_1.Common.encrypt(req.session.cart)
        });
    }
}
SessionController.productService = new product_service_1.default();
SessionController.productColorService = new product_color_service_1.default();
SessionController.salePriceService = new sale_price_service_1.default();
SessionController.productSizeSerivce = new product_size_service_1.default();
exports.default = SessionController;
