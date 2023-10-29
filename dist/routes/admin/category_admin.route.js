"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_admin_controller_1 = __importDefault(require("../../controllers/admin/category_admin.controller"));
const adminRoute = express_1.default.Router();
adminRoute.get('/category/new', category_admin_controller_1.default.EditCategory);
exports.default = adminRoute;
