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
// export async function index () {
//     // const dataSource: DataSource = await initialize() as DataSource;
//     // const manager: EntityManager = dataSource.manager;
//     // const cutomerResult: Customer[] = await manager.getRepository(Customer).createQueryBuilder('customer').getMany();
//     // console.log(cutomerResult);
//     // dataSource.destroy();
// };
class MainControler {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield MainControler.categoryService.GetAllCategory();
                const categoriesWithProduct = yield MainControler.categoryService.GetProductWithCategory();
                return res.render('./client/index.ejs', { category, categoriesWithProduct });
            }
            catch (error) {
                logging_1.logging.error(`[${MainControler.name}].[${MainControler.index.name}]: ${error}`);
                return res.redirect('/page_error');
            }
        });
    }
}
MainControler.categoryService = new category_service_1.default();
exports.default = MainControler;
