"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_admin_controller_1 = __importDefault(require("../../controllers/admin/category_admin.controller"));
const main_admin_controller_1 = __importDefault(require("../../controllers/admin/main_admin.controller"));
const product_admin_controller_1 = __importDefault(require("../../controllers/admin/product_admin.controller"));
const adminRoute = express_1.default.Router();
adminRoute.get('/', main_admin_controller_1.default.index);
// category
adminRoute.get('/category/list', category_admin_controller_1.default.ListCategory);
adminRoute.get('/category/new', category_admin_controller_1.default.EditCategory);
adminRoute.get('/category/update/:categorycode', category_admin_controller_1.default.EditCategory);
adminRoute.get('/product/new', product_admin_controller_1.default.EditProduct);
adminRoute.get('/product/update/:productcode', product_admin_controller_1.default.EditProduct);
adminRoute.get('/product/list', product_admin_controller_1.default.ListProduct);
adminRoute.get('/product/size-price/:productcode', product_admin_controller_1.default.SalePriceSize);
exports.default = adminRoute;
