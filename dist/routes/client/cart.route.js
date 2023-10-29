"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = __importDefault(require("../../controllers/client/cart.controller"));
const cartRoute = express_1.default.Router();
cartRoute.get('/showcart', cart_controller_1.default.ShowCart);
exports.default = cartRoute;
