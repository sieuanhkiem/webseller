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
const common_extendsion_1 = require("../../common/common_extendsion");
const category_service_1 = __importDefault(require("../../services/category.service"));
class CategoryJsonController {
    static InsertCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strJsonEncryt = req.body.category_name || '';
                if (strJsonEncryt == '')
                    throw new Error('Request body send is not found category name');
                const category_name = common_extendsion_1.Common.decrypt(strJsonEncryt);
                const categoryNew = yield CategoryJsonController.categoryService.InsertCategory(category_name);
                if (categoryNew == false)
                    throw new Error(`Create category faild`);
                return res.json({
                    code: 200,
                    category: common_extendsion_1.Common.encrypt(categoryNew)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.InsertCategory.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack || null
                });
            }
        });
    }
    static UpdateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestJsonEncrypt = req.body.category_update || null;
                if (requestJsonEncrypt == null)
                    throw new Error('Can not found category update when sending');
                const { category_code, category_name } = common_extendsion_1.Common.decrypt(requestJsonEncrypt);
                let categoryFind = yield CategoryJsonController.categoryService.GetCategoryByCode(category_code);
                if (categoryFind == null || categoryFind == undefined)
                    throw new Error(`Can not find category by category code ${category_code}`);
                categoryFind.category_name = category_name;
                const rowsAffect = yield CategoryJsonController.categoryService.UpdateCategory(categoryFind);
                if (rowsAffect == 0 || rowsAffect == false)
                    throw new Error(`Update category faild`);
                res.json({
                    code: 200,
                    category: common_extendsion_1.Common.encrypt(categoryFind)
                });
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.UpdateCategory.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack || null
                });
            }
        });
    }
    static DeleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const strJsonEncryt = req.body.category_code || '';
                if (strJsonEncryt == '')
                    throw new Error('Request body send is not found category code');
                const category_code = common_extendsion_1.Common.decrypt(strJsonEncryt);
                const deleteResult = yield CategoryJsonController.categoryService.DeleteCategory(category_code);
                if (deleteResult == 0 || deleteResult == false)
                    throw new Error('Delete category faild');
                return res.json({
                    code: 200,
                    rowDelete: deleteResult
                });
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryJsonController.name}].[${CategoryJsonController.DeleteCategory.name}]: ${error}`);
                return res.json({
                    code: 500,
                    error: error.message,
                    stack: error.stack || null
                });
            }
        });
    }
}
CategoryJsonController.categoryService = new category_service_1.default();
exports.default = CategoryJsonController;
