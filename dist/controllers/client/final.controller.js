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
const sale_order_service_1 = __importDefault(require("../../services/sale_order.service"));
const entity_1 = require("../../enum/entity");
const category_service_1 = __importDefault(require("../../services/category.service"));
class FinalController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerCode = req.params.customercode || null;
                if (customerCode == null)
                    throw new Error('Can not find customer code');
                const saleOrders = yield FinalController.saleOrderService.GetSaleOrderByCustomerCode(customerCode);
                for (let saleOrder of saleOrders) {
                    saleOrder.status = entity_1.SalerOrderStatus.CHOVANCHUYEN;
                    const updateResult = yield FinalController.saleOrderService.UpdateSaleOrder(saleOrder);
                    if (updateResult == false)
                        throw new Error('Update saler order faild');
                }
                const totalPrice = saleOrders.reduce(function (totalPrice, saleOrder) {
                    totalPrice += saleOrder.amount;
                    return totalPrice;
                }, 0);
                const category = yield FinalController.categoryService.GetAllCategory();
                const categoriesWithProduct = yield FinalController.categoryService.GetProductWithCategory();
                res.render('./client/final.ejs', { saleOrders, totalPrice, category, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${FinalController.name}].[${FinalController.index}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
}
FinalController.saleOrderService = new sale_order_service_1.default();
FinalController.categoryService = new category_service_1.default();
exports.default = FinalController;
