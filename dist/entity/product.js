"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_size_1 = require("./product_size");
const sales_price_1 = require("./sales_price");
const sales_order_1 = require("./sales_order");
const image_product_1 = require("./image_product");
const inventory_1 = require("./inventory");
const product_category_1 = require("./product_category");
const product_color_1 = require("./product_color");
let Product = class Product extends typeorm_1.BaseEntity {
};
exports.Product = Product;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    })
    // @Column({
    //     name: 'Id',
    //     type: 'uniqueidentifier',
    // })
    ,
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Product_Code',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        unique: true
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Product.prototype, "product_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Product_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Product.prototype, "product_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Product_Type',
        type: 'nvarchar',
        length: 50,
        nullable: true
    }),
    (0, class_validator_1.Length)(50),
    __metadata("design:type", String)
], Product.prototype, "product_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Product_Group',
        type: 'nvarchar',
        length: 50,
        nullable: true
    }),
    (0, class_validator_1.Length)(50),
    __metadata("design:type", String)
], Product.prototype, "product_group", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Brand',
        type: 'nvarchar',
        length: 50,
        nullable: true
    }),
    (0, class_validator_1.Length)(50),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Product.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Preserve',
        type: 'nvarchar',
        length: 255,
        nullable: true
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Product.prototype, "preserve", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Product.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Product.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_size_1.ProductSize, (productSize) => productSize.product),
    __metadata("design:type", Array)
], Product.prototype, "product_sizes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_price_1.SalesPrice, (salePrice) => salePrice.product),
    __metadata("design:type", Array)
], Product.prototype, "sales_price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_order_1.SalesOrder, (saleOrder) => saleOrder.product),
    __metadata("design:type", Array)
], Product.prototype, "sales_order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => image_product_1.ImageProduct, (imageProduct) => imageProduct.product),
    __metadata("design:type", Array)
], Product.prototype, "images_product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_1.Inventory, (invetory) => invetory.product),
    __metadata("design:type", Array)
], Product.prototype, "inventoris", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_category_1.ProductCategory, (productCateogry) => productCateogry.products, { nullable: true }),
    __metadata("design:type", Object)
], Product.prototype, "category_product", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => product_color_1.ProductColor, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Product.prototype, "product_colors", void 0);
exports.Product = Product = __decorate([
    (0, typeorm_1.Entity)('Product')
], Product);
