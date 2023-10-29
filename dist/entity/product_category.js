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
exports.ProductCategory = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_1 = require("./product");
let ProductCategory = class ProductCategory extends typeorm_1.BaseEntity {
};
exports.ProductCategory = ProductCategory;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Category_Code',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        unique: true
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], ProductCategory.prototype, "category_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Category_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], ProductCategory.prototype, "category_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProductCategory.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Active',
        type: 'bit',
        nullable: true,
        default: 1
    }),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], ProductCategory.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_1.Product, (product) => product.category_product),
    __metadata("design:type", Array)
], ProductCategory.prototype, "products", void 0);
exports.ProductCategory = ProductCategory = __decorate([
    (0, typeorm_1.Entity)('Product_Category')
], ProductCategory);
