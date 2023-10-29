"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const final_controller_1 = __importDefault(require("../../controllers/client/final.controller"));
const finalRoute = express_1.default.Router();
finalRoute.get('/:customercode', final_controller_1.default.index);
exports.default = finalRoute;
