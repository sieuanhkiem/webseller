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
exports.SalesPrice = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_1 = require("./product");
const product_size_1 = require("./product_size");
let SalesPrice = class SalesPrice extends typeorm_1.BaseEntity {
};
exports.SalesPrice = SalesPrice;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SalesPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sale_Code',
        type: 'nvarchar',
        nullable: false,
        unique: true
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], SalesPrice.prototype, "sale_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sale_Price',
        type: 'int',
        unsigned: true,
        nullable: false
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SalesPrice.prototype, "sale_price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Curcency',
        type: 'nvarchar',
        length: 100,
        nullable: true,
        default: 'VNĐ'
    }),
    __metadata("design:type", String)
], SalesPrice.prototype, "curcency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Price_Date',
        type: 'datetime',
        nullable: true,
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SalesPrice.prototype, "price_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Created_By',
        type: 'nvarchar',
        nullable: true,
        length: 100,
        default: 'admin'
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], SalesPrice.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SalesPrice.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], SalesPrice.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Active',
        type: 'bit',
        nullable: true
    }),
    __metadata("design:type", Boolean)
], SalesPrice.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product.sales_price, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", product_1.Product)
], SalesPrice.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_size_1.ProductSize, (productSize) => productSize.sales_price, { nullable: true }),
    __metadata("design:type", product_size_1.ProductSize)
], SalesPrice.prototype, "product_size", void 0);
exports.SalesPrice = SalesPrice = __decorate([
    (0, typeorm_1.Entity)('Sales_Price')
], SalesPrice);
