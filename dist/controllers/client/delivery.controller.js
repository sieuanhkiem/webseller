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
const city_service_1 = __importDefault(require("../../services/city.service"));
const customer_service_1 = __importDefault(require("../../services/customer.service"));
const address_service_1 = __importDefault(require("../../services/address.service"));
const sales_order_1 = require("../../entity/sales_order");
const inventory_service_1 = __importDefault(require("../../services/inventory.service"));
const product_service_1 = __importDefault(require("../../services/product.service"));
const sale_order_service_1 = __importDefault(require("../../services/sale_order.service"));
const category_service_1 = __importDefault(require("../../services/category.service"));
class DeliveryController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield DeliveryController.cityService.GetAllCity();
                const cart = req.session.cart;
                const category = yield DeliveryController.categoryService.GetAllCategory();
                const categoriesWithProduct = yield DeliveryController.categoryService.GetProductWithCategory();
                return res.render('./client/delivery.ejs', { cities, cart, category, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${DeliveryController.name}].[${DeliveryController.index.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
    static postDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = req.session.cart;
                const postDelivery = req.body;
                if (postDelivery == null)
                    throw new Error('Post delivery not found in body');
                let customer = yield DeliveryController.customerService.GetCustomerByCode(postDelivery.code);
                if (customer == null) {
                    customer = yield DeliveryController.customerService.createCustomer(postDelivery);
                }
                else {
                    const addressUpdate = customer.address;
                    addressUpdate.address_1 = postDelivery.address;
                    const result = yield DeliveryController.addressService.UpdateAddress(addressUpdate);
                    if (result != false)
                        customer.address = result;
                }
                for (let cartItem of cart.cartItem) {
                    const product = yield DeliveryController.productService.FindProductByCode(cartItem.productCode);
                    const sizeProduct = product === null || product === void 0 ? void 0 : product.product_sizes.filter((size) => size.size_code == cartItem.sizeCode)[0];
                    const saleOrder = new sales_order_1.SalesOrder();
                    saleOrder.quantity = cartItem.quantity;
                    saleOrder.amount = cartItem.price;
                    saleOrder.customer = customer;
                    saleOrder.product = product;
                    saleOrder.product_size = sizeProduct;
                    const resultCreate = yield DeliveryController.saleOrderService.CreateSaleOrder(saleOrder);
                    if (resultCreate == false)
                        throw new Error(`Create sale order faild ${product === null || product === void 0 ? void 0 : product.product_name}-${product === null || product === void 0 ? void 0 : product.product_code}_${sizeProduct.size_code}-${sizeProduct.size_name}`);
                }
                req.session.destroy((err) => logging_1.logging.error(err));
                return res.redirect(`/final/${customer.customer_code}`);
            }
            catch (error) {
                logging_1.logging.error(`[${DeliveryController.name}].[${DeliveryController.postDelivery.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
}
DeliveryController.cityService = new city_service_1.default();
DeliveryController.customerService = new customer_service_1.default();
DeliveryController.addressService = new address_service_1.default();
DeliveryController.inventoryService = new inventory_service_1.default();
DeliveryController.productService = new product_service_1.default();
DeliveryController.saleOrderService = new sale_order_service_1.default();
DeliveryController.categoryService = new category_service_1.default();
exports.default = DeliveryController;
