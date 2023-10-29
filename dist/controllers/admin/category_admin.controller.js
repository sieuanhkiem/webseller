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
const category_service_1 = __importDefault(require("../../services/category.service"));
class CategoryAdminController {
    static EditCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryCode = req.params.categorycode || null;
                if (categoryCode != null) {
                    const categoryFind = yield CategoryAdminController.categoryService.GetCategoryByCode(categoryCode);
                    if (categoryFind == undefined || categoryFind == null)
                        throw new Error(`Can not find category by ${categoryCode}`);
                    return res.render('./admin/category_edit.ejs', { category: categoryFind });
                }
                return res.render('./admin/category_new.ejs');
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryAdminController.name}].[${CategoryAdminController.EditCategory.name}]: ${error}`);
                res.redirect('/page_error');
            }
        });
    }
    static ListCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = (yield CategoryAdminController.categoryService.GetAllCategory()) || [];
                return res.render('./admin/category_list.ejs', { categories });
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryAdminController.name}].[${CategoryAdminController.ListCategory.name}]: ${error}`);
                return res.redirect('/oage_error');
            }
        });
    }
}
CategoryAdminController.categoryService = new category_service_1.default();
exports.default = CategoryAdminController;
