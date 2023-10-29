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
exports.SalesOrder = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const product_1 = require("./product");
const inventory_1 = require("./inventory");
const customer_1 = require("./customer");
const product_size_1 = require("./product_size");
let SalesOrder = class SalesOrder extends typeorm_1.BaseEntity {
};
exports.SalesOrder = SalesOrder;
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
], SalesOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sale_Order_Code',
        type: 'nvarchar',
        nullable: false,
        length: 100
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], SalesOrder.prototype, "transaction_number", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sale_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SalesOrder.prototype, "sale_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Delivery_Date',
        type: 'datetime',
        nullable: true,
        // default: Date.now()
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date
    // @Column({
    //     name: 'Product_Num',
    //     type: 'nvarchar',
    //     nullable: false,
    //     length: 100
    // })
    // @Length(100)
    // product_num: string
    )
], SalesOrder.prototype, "delivery_date", void 0);
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
], SalesOrder.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SalesOrder.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Last_Update',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], SalesOrder.prototype, "last_update", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Quantity',
        type: 'int',
        unsigned: true,
        nullable: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SalesOrder.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Amount',
        type: 'int',
        unsigned: true,
        nullable: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SalesOrder.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Tax',
        type: 'int',
        unsigned: true,
        nullable: true,
        default: 5
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SalesOrder.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Transport_Fee',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], SalesOrder.prototype, "transport_fee", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Salesman',
        type: 'nvarchar',
        length: 100,
        nullable: false,
        default: 'admin'
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], SalesOrder.prototype, "salesman", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], SalesOrder.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Cancle',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], SalesOrder.prototype, "is_cancle", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'int',
        nullable: true,
        default: 1
    }),
    __metadata("design:type", Number)
], SalesOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product.sales_order, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", product_1.Product)
], SalesOrder.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_size_1.ProductSize, (productSize) => productSize.sale_orders, { nullable: true }),
    __metadata("design:type", product_size_1.ProductSize)
], SalesOrder.prototype, "product_size", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_1.Inventory, (inventory) => inventory.sales_order, { nullable: true }),
    __metadata("design:type", inventory_1.Inventory)
], SalesOrder.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_1.Customer, (customer) => customer.sales_orders, { nullable: true }),
    __metadata("design:type", customer_1.Customer)
], SalesOrder.prototype, "customer", void 0);
exports.SalesOrder = SalesOrder = __decorate([
    (0, typeorm_1.Entity)('Sales_Order')
], SalesOrder);
