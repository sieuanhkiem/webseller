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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const sales_order_1 = require("./sales_order");
const address_1 = require("./address");
let Customer = class Customer extends typeorm_1.BaseEntity {
};
exports.Customer = Customer;
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
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'nvarchar',
        unique: true,
        length: 100,
        name: 'Customer_Code'
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Customer.prototype, "customer_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'nvarchar',
        length: 255,
        name: 'Customer_Name'
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Customer.prototype, "customer_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'numeric',
        unsigned: true,
        name: 'Age'
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Customer.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sex',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Customer.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: 'nvarchar',
        length: 255,
        name: 'Job'
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Customer.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Telephone1',
        type: 'nvarchar',
        length: 18,
        nullable: true
    }),
    (0, class_validator_1.Length)(18),
    __metadata("design:type", String)
], Customer.prototype, "telephone1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Telephone2',
        type: 'nvarchar',
        length: 18,
        nullable: true
    }),
    (0, class_validator_1.Length)(18),
    __metadata("design:type", String)
], Customer.prototype, "telephone2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Customer.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Customer.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sales_order_1.SalesOrder, (saleOrder) => saleOrder.customer),
    __metadata("design:type", Array)
], Customer.prototype, "sales_orders", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_1.Address, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_1.Address)
], Customer.prototype, "address", void 0);
exports.Customer = Customer = __decorate([
    (0, typeorm_1.Entity)('Customer')
], Customer);
