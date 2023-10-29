"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const session_controller_1 = __importDefault(require("../../controllers/session/session.controller"));
const sessionRoute = express_1.default.Router();
sessionRoute.get('/get-session-cart', session_controller_1.default.getSessionCart);
sessionRoute.post('/push-session-cart', session_controller_1.default.pushSessionCart);
sessionRoute.post('/remove-session-cart', session_controller_1.default.removeSessionCart);
sessionRoute.post('/update-session-cart', session_controller_1.default.updateSessionCart);
sessionRoute.post('/clear-session-cart', session_controller_1.default.clearCartSession);
exports.default = sessionRoute;
