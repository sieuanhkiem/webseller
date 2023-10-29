"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delivery_controller_1 = __importDefault(require("../../controllers/client/delivery.controller"));
const deliveryRoute = express_1.default.Router();
deliveryRoute.get('/', function (req, res, next) {
    if (req.session.cart == undefined || req.session.cart == null || req.session.cart.cartItem.length == 0)
        return res.redirect('/page_error');
    next();
}, delivery_controller_1.default.index);
deliveryRoute.post('/post_delivery', delivery_controller_1.default.postDelivery);
exports.default = deliveryRoute;
