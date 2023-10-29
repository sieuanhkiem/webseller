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
const base_service_1 = __importDefault(require("./base.service"));
const logging_1 = require("../config/logging");
const product_category_1 = require("../entity/product_category");
const common_extendsion_1 = require("../common/common_extendsion");
const product_1 = require("../entity/product");
const category_product_model_1 = require("../models/category/category_product.model");
class CategoryService extends base_service_1.default {
    GetCategoryByCode(code) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryCategory = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(product_category_1.ProductCategory);
                const categoryProduct = yield repositoryCategory.createQueryBuilder('category')
                    .where('category.category_code = :category_code', { category_code: code }).getOne();
                yield _super.disconnectDatabase.call(this);
                return categoryProduct;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.GetCategoryByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return;
            }
        });
    }
    GetAllCategory() {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const productCategory = yield product_category_1.ProductCategory.find();
                yield _super.disconnectDatabase.call(this);
                return productCategory;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.GetAllCategory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return;
            }
        });
    }
    InsertCategory(categoryName) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const categoryRepository = _super.createRepository.call(this, product_category_1.ProductCategory);
                const countCategory = (yield categoryRepository.count()) + 1;
                let categoryNew = new product_category_1.ProductCategory();
                categoryNew.category_code = `CATE-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(countCategory, 6)}`;
                categoryNew.category_name = categoryName;
                categoryNew = yield categoryRepository.save(categoryNew);
                yield _super.disconnectDatabase.call(this);
                return categoryNew;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.InsertCategory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    UpdateCategory(categoryUpdate) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const categoryRepository = _super.createRepository.call(this, product_category_1.ProductCategory);
                const updateResult = yield categoryRepository.createQueryBuilder('category').update()
                    .set({ category_name: categoryUpdate.category_name })
                    .where('category_code = :categoryCode', { categoryCode: categoryUpdate.category_code })
                    .execute();
                yield _super.disconnectDatabase.call(this);
                return updateResult.affected || 0;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.UpdateCategory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    DeleteCategory(categoryCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const categoryRepository = _super.createRepository.call(this, product_category_1.ProductCategory);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                yield productRepository.createQueryBuilder('product')
                    .innerJoin('product.category_product', 'category')
                    .update()
                    .set({ category_product: null })
                    .whereEntity(yield productRepository.createQueryBuilder('product')
                    .innerJoin('product.category_product', 'category')
                    .where('category.category_code = :categoryCode', { categoryCode })
                    .getMany())
                    .execute();
                const deleteResult = yield categoryRepository.createQueryBuilder('category').delete()
                    .where('category_code = :categoryCode', { categoryCode })
                    .execute();
                yield _super.disconnectDatabase.call(this);
                return deleteResult.affected || 0;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.DeleteCategory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    GetProductWithCategory() {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = (yield this.GetAllCategory()) || [];
                const categoriesWithProduct = [];
                if (categories.length == 0)
                    return categoriesWithProduct;
                yield _super.connectDatabase.call(this);
                const repositoryProduct = _super.createRepository.call(this, product_1.Product);
                for (let category of categories) {
                    let products = yield repositoryProduct.createQueryBuilder('product')
                        .innerJoin('product.category_product', 'category')
                        .innerJoin('product.sales_order', 'sale_order')
                        .select('product.product_code as product_code, product.product_name as product_name')
                        .addSelect('COUNT(*) AS count')
                        .where('category.category_code = :categoryCode', { categoryCode: category.category_code })
                        .groupBy('product.product_code, product.product_name')
                        .addOrderBy('count', 'DESC')
                        .limit(4)
                        .execute();
                    if (products.length == 0) {
                        products = yield repositoryProduct.createQueryBuilder('product')
                            .innerJoin('product.category_product', 'category')
                            .select('product.product_code as product_code, product.product_name as product_name')
                            .where('category.category_code = :categoryCode', { categoryCode: category.category_code })
                            .limit(4)
                            .execute();
                    }
                    const categoryWithProduct = new category_product_model_1.CategoryWithProduct();
                    categoryWithProduct.category = category;
                    categoryWithProduct.products = products;
                    categoriesWithProduct.push(categoryWithProduct);
                    if (categoriesWithProduct.length == 2)
                        break;
                }
                yield _super.disconnectDatabase.call(this);
                return categoriesWithProduct;
            }
            catch (error) {
                logging_1.logging.error(`[${CategoryService.name}].[${this.GetProductWithCategory.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
}
exports.default = CategoryService;
