"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../../controllers/client/product.controller"));
const productRoute = express_1.default.Router();
productRoute.get('/:productcode', product_controller_1.default.index);
exports.default = productRoute;
