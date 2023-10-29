"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const page_error_controller_1 = require("../../controllers/client/page_error.controller");
const page_err = express_1.default.Router();
page_err.get('/', page_error_controller_1.page_error);
exports.default = page_err;
