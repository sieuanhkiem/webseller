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
exports.Inventory = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_1 = require("./product");
const shops_1 = require("./shops");
const product_color_1 = require("./product_color");
const product_size_1 = require("./product_size");
const sales_order_1 = require("./sales_order");
let Inventory = class Inventory extends typeorm_1.BaseEntity {
};
exports.Inventory = Inventory;
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
], Inventory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Inventory_Date',
        nullable: true,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Inventory.prototype, "transaction_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Created_By',
        nullable: true,
        type: 'nvarchar',
        length: 100,
        default: 'admin'
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Inventory.prototype, "create_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        nullable: true,
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date
    // @Column({
    //     name: 'Transaction_Type',
    //     nullable: true,
    //     type: 'nvarchar',
    //     length: 50
    // })
    // @Length(50)
    // transaction_type: string
    // @Column({
    //     name: 'Product_Num',
    //     nullable: false,
    //     type: 'nvarchar',
    //     length: 100
    // })
    // @Length(100)
    // product_num: string
    )
], Inventory.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Quantity',
        nullable: true,
        type: 'numeric',
        unsigned: true
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Inventory.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Amount',
        nullable: true,
        type: 'int',
        unsigned: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Inventory.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Price',
        nullable: false,
        type: 'int',
        unsigned: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Inventory.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Currenry',
        type: 'nvarchar',
        length: 30,
        nullable: true,
        default: 'VNĐ'
    }),
    (0, class_validator_1.Length)(30),
    __metadata("design:type", String)
], Inventory.prototype, "currenry", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Inventory.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product.inventoris, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", product_1.Product)
], Inventory.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => shops_1.Shops, (shop) => shop.inventories, { nullable: true }),
    __metadata("design:type", shops_1.Shops)
], Inventory.prototype, "shop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_color_1.ProductColor, (productColor) => productColor.inventories, { nullable: true }),
    __metadata("design:type", product_1.Product)
], Inventory.prototype, "product_color", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_size_1.ProductSize, (productSize) => productSize.inventories, { nullable: true }),
    __metadata("design:type", product_size_1.ProductSize)
], Inventory.prototype, "product_size", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_order_1.SalesOrder, (saleOrder) => saleOrder.inventory),
    __metadata("design:type", Array)
], Inventory.prototype, "sales_order", void 0);
exports.Inventory = Inventory = __decorate([
    (0, typeorm_1.Entity)('Inventory')
], Inventory);
