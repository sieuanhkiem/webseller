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
exports.ProductSize = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_1 = require("./product");
const inventory_1 = require("./inventory");
const sales_price_1 = require("./sales_price");
const sales_order_1 = require("./sales_order");
let ProductSize = class ProductSize extends typeorm_1.BaseEntity {
};
exports.ProductSize = ProductSize;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductSize.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Size_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], ProductSize.prototype, "size_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Size_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], ProductSize.prototype, "size_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], ProductSize.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], ProductSize.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProductSize.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product.product_sizes, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", product_1.Product)
], ProductSize.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_price_1.SalesPrice, (salePrice) => salePrice.product_size),
    __metadata("design:type", Array)
], ProductSize.prototype, "sales_price", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_1.Inventory, (inventory) => inventory.product_size),
    __metadata("design:type", Array)
], ProductSize.prototype, "inventories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_order_1.SalesOrder, (saleOrder) => saleOrder.product_size),
    __metadata("design:type", Array)
], ProductSize.prototype, "sale_orders", void 0);
exports.ProductSize = ProductSize = __decorate([
    (0, typeorm_1.Entity)('Product_Size')
], ProductSize);
