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
const product_1 = require("../entity/product");
const sales_price_1 = require("../entity/sales_price");
const base_service_1 = __importDefault(require("./base.service"));
const logging_1 = require("../config/logging");
require("../common/date_extendsion");
const order_1 = require("../enum/order");
const product_category_1 = require("../entity/product_category");
const image_1 = require("../entity/image");
const product_color_1 = require("../entity/product_color");
const common_extendsion_1 = require("../common/common_extendsion");
const image_product_1 = require("../entity/image_product");
const entity_1 = require("../enum/entity");
const image_model_1 = require("../models/image/image.model");
class ProductService extends base_service_1.default {
    GetProductByNumberPage(page = 1, quantityOfPage, categoryCode, order = order_1.Order.ASC) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const position = (page - 1) * quantityOfPage;
                yield _super.connectDatabase.call(this);
                const repositoryProduct = yield ((_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(product_1.Product));
                const repositorySalePrice = yield ((_b = this.dataSource) === null || _b === void 0 ? void 0 : _b.getRepository(sales_price_1.SalesPrice));
                const selectQuery = yield repositoryProduct.createQueryBuilder('product')
                    .innerJoin('product.category_product', 'category')
                    .where('category.category_code = :category', { category: categoryCode });
                const countData = yield selectQuery.getCount();
                const maxPage = Math.floor(countData / quantityOfPage) + 1;
                let productReuslt = yield selectQuery
                    .orderBy('product.create_date', 'DESC')
                    .offset(position)
                    .limit(quantityOfPage)
                    .setFindOptions({
                    relations: {
                        images_product: {
                            images: true
                        }
                    }
                })
                    .getMany();
                for (let productPagination of productReuslt) {
                    const salePrice = yield repositorySalePrice.createQueryBuilder('sale_price')
                        .select('MIN(sale_price.sale_price)', 'salePrice')
                        .addSelect('product.product_code', 'productCode')
                        .addSelect('sale_price.sale_code', 'saleCode')
                        .innerJoin('sale_price.product', 'product')
                        .where('product.id = :productId and sale_price.is_delete = :delete', { productId: productPagination.id, delete: 0 })
                        .groupBy('product.product_code, sale_price.sale_code')
                        .execute();
                    if (salePrice.length > 0)
                        productPagination.price_product = salePrice[0];
                    productPagination.images_product = productPagination.images_product.map((productImage) => {
                        const imageModel = new image_model_1.ImageModel(productImage.images);
                        if (productImage.images.image != null)
                            imageModel.image_base64 = productImage.images.image.toString('base64');
                        productImage.images = imageModel;
                        return productImage;
                    });
                }
                productReuslt = productReuslt.sort(function (proctOne, proctTwo) {
                    var _a, _b;
                    const priceOne = ((_a = proctOne.price_product) === null || _a === void 0 ? void 0 : _a.salePrice) || 0;
                    const priceTwo = ((_b = proctTwo.price_product) === null || _b === void 0 ? void 0 : _b.salePrice) || 0;
                    if (priceOne == 0 || priceTwo == 0)
                        return 1;
                    return order == order_1.Order.ASC ? priceOne - priceTwo : priceTwo - priceOne;
                });
                yield _super.disconnectDatabase.call(this);
                return {
                    currentPage: page,
                    maxPage,
                    totalRecord: countData,
                    isContinue: page == maxPage,
                    products: productReuslt
                };
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.GetProductByNumberPage.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return {
                    currentPage: page,
                    totalRecord: 0,
                    maxPage: 0,
                    isContinue: false,
                    products: []
                };
            }
        });
    }
    GetDetailsProduct(productCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const repositoryProduct = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(product_1.Product);
                const repositorySalePrice = (_b = this.dataSource) === null || _b === void 0 ? void 0 : _b.getRepository(sales_price_1.SalesPrice);
                let productDetail = yield repositoryProduct.createQueryBuilder('product')
                    .where('product.product_code = :productCode', { productCode })
                    .setFindOptions({
                    relations: {
                        category_product: true,
                        images_product: {
                            images: true
                        },
                        product_sizes: true,
                        product_colors: true
                    }
                })
                    .getOneOrFail();
                productDetail.images_product = productDetail.images_product.map((productImage) => {
                    const imageModel = new image_model_1.ImageModel(productImage.images);
                    if (productImage.images.image != null)
                        imageModel.image_base64 = productImage.images.image.toString('base64');
                    productImage.images = imageModel;
                    return productImage;
                });
                const salePriceProduct = yield repositorySalePrice.createQueryBuilder('sale_price')
                    .select('Min(sale_price.sale_price)', 'salePrice')
                    .addSelect('product.product_code', 'productCode')
                    .addSelect('sale_price.sale_code', 'saleCode')
                    .addSelect('product_size.size_code', 'sizeCode')
                    .innerJoin('sale_price.product', 'product')
                    .innerJoin('sale_price.product_size', 'product_size')
                    .where('product.product_code = :productCode and sale_price.is_delete = :delete', { productCode, delete: 0 })
                    .groupBy('product.product_code, sale_price.sale_code, product_size.size_code')
                    .execute();
                if (salePriceProduct.length > 0)
                    productDetail.price_product = salePriceProduct[0];
                yield _super.disconnectDatabase.call(this);
                return productDetail;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.GetDetailsProduct.name}]: ${error}`);
                _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    GetRandomProduct() {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repositoryProduct = (_a = this.dataSource) === null || _a === void 0 ? void 0 : _a.getRepository(product_1.Product);
                const repositorySalePrice = yield ((_b = this.dataSource) === null || _b === void 0 ? void 0 : _b.getRepository(sales_price_1.SalesPrice));
                yield _super.connectDatabase.call(this);
                let productsRand = yield repositoryProduct.createQueryBuilder('product')
                    .orderBy('NEWID()')
                    .setFindOptions({
                    relations: {
                        images_product: {
                            images: true
                        }
                    }
                })
                    .limit(5)
                    .getMany();
                for (let product of productsRand) {
                    const salePrice = yield repositorySalePrice.createQueryBuilder('sale_price')
                        .select('MIN(sale_price.sale_price)', 'salePrice')
                        .addSelect('product.product_code', 'productCode')
                        .addSelect('sale_price.sale_code', 'saleCode')
                        .innerJoin('sale_price.product', 'product')
                        .where('product.id = :productId and sale_price.is_delete = :delete', { productId: product.id, delete: 0 })
                        .groupBy('product.product_code, sale_price.sale_code')
                        .execute();
                    if (salePrice.length > 0)
                        product.price_product = salePrice[0];
                    product.images_product = product.images_product.map((productImage) => {
                        const imageModel = new image_model_1.ImageModel(productImage.images);
                        if (productImage.images.image != null)
                            imageModel.image_base64 = productImage.images.image.toString('base64');
                        productImage.images = imageModel;
                        return productImage;
                    });
                }
                yield _super.disconnectDatabase.call(this);
                return productsRand;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.GetRandomProduct.name}]: ${error}`);
                return [];
            }
        });
    }
    FindProductByCode(productCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                let product = yield product_1.Product.findOneOrFail({
                    where: {
                        product_code: productCode,
                    },
                    relations: {
                        images_product: {
                            images: true
                        },
                        product_sizes: true,
                        product_colors: true,
                        category_product: true
                    }
                });
                product.images_product = product.images_product.map((productImage) => {
                    const imageModel = new image_model_1.ImageModel(productImage.images);
                    if (productImage.images.image != null)
                        imageModel.image_base64 = productImage.images.image.toString('base64');
                    productImage.images = imageModel;
                    return productImage;
                });
                yield _super.disconnectDatabase.call(this);
                return product;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.FindProductByCode.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    InsertProduct(productInsert) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                const categoryRepository = _super.createRepository.call(this, product_category_1.ProductCategory);
                const imageRepository = _super.createRepository.call(this, image_1.Image);
                const colorRepository = _super.createRepository.call(this, product_color_1.ProductColor);
                const imageProductRepository = _super.createRepository.call(this, image_product_1.ImageProduct);
                const category = yield categoryRepository.createQueryBuilder('category').where('category_code= :categoryCode', { categoryCode: productInsert.category_code }).getOneOrFail();
                const colors = [];
                // const images: ImageProduct[] = [];
                if (productInsert.colors.length > 0) {
                    for (let color of productInsert.colors) {
                        const colorFind = yield colorRepository.findOne({
                            where: {
                                color_code: color.color_code
                            }
                        });
                        if (colorFind == null) {
                            const colorNew = new product_color_1.ProductColor();
                            colorNew.color_code = color.color_code;
                            colorNew.color_name = color.color_name;
                            colors.push(yield colorRepository.save(colorNew));
                        }
                        else
                            colors.push(colorFind);
                    }
                }
                const conutProduct = yield productRepository.count();
                let productNew = new product_1.Product();
                productNew.product_name = productInsert.product_name;
                productNew.product_code = `PROD-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(conutProduct + 1, 6)}`;
                productNew.brand = productInsert.brand;
                productNew.comment = productInsert.comment;
                productNew.preserve = productInsert.preserve;
                productNew.category_product = category;
                productNew.product_colors = colors;
                productNew = yield productRepository.save(productNew);
                if (productInsert.images.length > 0) {
                    for (let image of productInsert.images) {
                        const countImage = yield imageRepository.count();
                        const imageNew = new image_1.Image();
                        imageNew.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(countImage + 1, 6)}`;
                        imageNew.image_name = image.image_name;
                        imageNew.image_type = entity_1.ImageType.PRODUCTTYPE;
                        if (image.image_default != undefined || image.image_default != null)
                            imageNew.image_default = image.image_default;
                        imageNew.image = Buffer.from(image.buffer, 'base64');
                        const imageProduct = new image_product_1.ImageProduct();
                        imageProduct.images = yield imageRepository.save(imageNew);
                        imageProduct.product = productNew;
                        yield imageProductRepository.save(imageProduct);
                    }
                }
                yield _super.disconnectDatabase.call(this);
                return productNew;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.InsertProduct.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    DeleteImageAndColorProduct(productUpdate) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.FindProductByCode(productUpdate.product_code);
                if (product == null || product == undefined)
                    throw new Error(`Can not found product by ${productUpdate.product_code}`);
                yield _super.connectDatabase.call(this);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                const imageRepository = _super.createRepository.call(this, image_1.Image);
                const imageProductRepository = _super.createRepository.call(this, image_product_1.ImageProduct);
                const colorRepository = _super.createRepository.call(this, product_color_1.ProductColor);
                let imageCheck = true;
                let colorCheck = true;
                if (productUpdate.images.length > 0) {
                    for (let imageUpdate of productUpdate.images) {
                        const image = yield imageRepository.createQueryBuilder('image')
                            .where('image.image_code = :imageCode', { imageCode: imageUpdate.image_code })
                            .getOneOrFail();
                        const imageProduct = yield imageProductRepository.createQueryBuilder('imageProduct')
                            .innerJoin('imageProduct.product', 'product')
                            .innerJoin('imageProduct.images', 'image')
                            .where('product.product_code = :productCode and image.image_code = :imageCode', { productCode: product.product_code, imageCode: image.image_code })
                            .getOneOrFail();
                        const deleteImageProductReult = yield imageProductRepository.createQueryBuilder().delete()
                            .where('id = :id', { id: imageProduct.id })
                            .execute();
                        if (deleteImageProductReult.affected && deleteImageProductReult.affected > 0) {
                            const deleteImageResult = yield imageRepository.createQueryBuilder('image').delete()
                                .where('image.image_code = :imageCode', { imageCode: image.image_code })
                                .execute();
                            imageCheck = deleteImageResult.affected != null && deleteImageResult.affected > 0;
                        }
                    }
                }
                if (productUpdate.colors.length > 0) {
                    let productColor = product.product_colors;
                    for (let colorUpdate of productUpdate.colors) {
                        const color = yield colorRepository.createQueryBuilder('color')
                            .where('color.color_code = :colorCode', { colorCode: colorUpdate.color_code })
                            .getOneOrFail();
                        const indexColor = productColor.findIndex(colr => colr.color_code == color.color_code);
                        if (indexColor > -1)
                            productColor.splice(indexColor, 1);
                    }
                    product.product_colors = productColor;
                    let productAfterUpdate = yield productRepository.save(product);
                    colorCheck = productAfterUpdate.product_colors.length == productColor.length;
                }
                yield _super.disconnectDatabase.call(this);
                return colorCheck && imageCheck;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.DeleteImageAndColorProduct.name}}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
    UpdateProduct(productUpdate) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.FindProductByCode(productUpdate.product_code);
                if (product == null || product == undefined)
                    throw new Error(`Can not found product by code ${productUpdate.product_code}`);
                yield _super.connectDatabase.call(this);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                const categoryRepository = _super.createRepository.call(this, product_category_1.ProductCategory);
                const imageRepository = _super.createRepository.call(this, image_1.Image);
                const colorRepository = _super.createRepository.call(this, product_color_1.ProductColor);
                const imageProductRepository = _super.createRepository.call(this, image_product_1.ImageProduct);
                const category = yield categoryRepository.createQueryBuilder('category').where('category_code= :categoryCode', { categoryCode: productUpdate.category_code }).getOneOrFail();
                const colors = [];
                if (productUpdate.colors.length > 0) {
                    for (let color of productUpdate.colors) {
                        const colorFind = yield colorRepository.findOne({
                            where: {
                                color_code: color.color_code
                            }
                        });
                        if (colorFind == null) {
                            const colorNew = new product_color_1.ProductColor();
                            colorNew.color_code = color.color_code;
                            colorNew.color_name = color.color_name;
                            colors.push(yield colorRepository.save(colorNew));
                        }
                        else
                            colors.push(colorFind);
                    }
                }
                product.product_name = productUpdate.product_name;
                product.brand = productUpdate.brand;
                product.comment = productUpdate.comment;
                product.preserve = productUpdate.preserve;
                product.category_product = category;
                product.product_colors.push(...colors);
                const productAfterUpdate = yield productRepository.save(product);
                if (productUpdate.images.length > 0) {
                    for (let image of productUpdate.images) {
                        const countImage = yield imageRepository.count();
                        const imageNew = new image_1.Image();
                        imageNew.image_code = `IMG-${new Date().formatTime('YYYYMMDDHHmmss')}-${common_extendsion_1.Common.paddWithLeadingZeros(countImage + 1, 6)}`;
                        imageNew.image_name = image.image_name;
                        imageNew.image_type = entity_1.ImageType.PRODUCTTYPE;
                        if (image.image_default != undefined || image.image_default != null)
                            imageNew.image_default = image.image_default;
                        imageNew.image = Buffer.from(image.buffer, 'base64');
                        const imageProduct = new image_product_1.ImageProduct();
                        imageProduct.images = yield imageRepository.save(imageNew);
                        imageProduct.product = productAfterUpdate;
                        yield imageProductRepository.save(imageProduct);
                    }
                }
                yield _super.disconnectDatabase.call(this);
                return productAfterUpdate;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.UpdateProduct.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return null;
            }
        });
    }
    GetAllProduct() {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield _super.connectDatabase.call(this);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                const products = yield productRepository.createQueryBuilder('product').setFindOptions({
                    relations: {
                        category_product: true,
                        product_colors: true,
                        images_product: true,
                        product_sizes: true
                    }
                }).getMany();
                yield _super.disconnectDatabase.call(this);
                return products;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.GetAllProduct.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return [];
            }
        });
    }
    DeleteProduct(productCode) {
        const _super = Object.create(null, {
            connectDatabase: { get: () => super.connectDatabase },
            createRepository: { get: () => super.createRepository },
            disconnectDatabase: { get: () => super.disconnectDatabase }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productDel = yield this.FindProductByCode(productCode);
                if (productDel == null || productDel == undefined)
                    throw new Error(`Can not found product by code ${productCode}`);
                yield _super.connectDatabase.call(this);
                const imageProductRepository = _super.createRepository.call(this, image_product_1.ImageProduct);
                const imageRepository = _super.createRepository.call(this, image_1.Image);
                const productRepository = _super.createRepository.call(this, product_1.Product);
                if (productDel.images_product.length > 0) {
                    for (let imageProduct of productDel.images_product) {
                        const deleteImageProduct = yield imageProductRepository.createQueryBuilder()
                            .delete()
                            .where('id= :id', { id: imageProduct.id })
                            .execute();
                        if (deleteImageProduct.affected != null && deleteImageProduct.affected > 0) {
                            yield imageRepository.createQueryBuilder()
                                .delete()
                                .where('id= :id', { id: imageProduct.images.id })
                                .execute();
                        }
                    }
                }
                const deleteProduct = yield productRepository.createQueryBuilder()
                    .delete()
                    .where('product_code = :productCode', { productCode: productDel.product_code })
                    .execute();
                yield _super.disconnectDatabase.call(this);
                return deleteProduct.affected != null && deleteProduct.affected != undefined && deleteProduct.affected > 0;
            }
            catch (error) {
                logging_1.logging.error(`[${ProductService.name}].[${this.DeleteProduct.name}]: ${error}`);
                yield _super.disconnectDatabase.call(this);
                return false;
            }
        });
    }
}
exports.default = ProductService;
