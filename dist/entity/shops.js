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
exports.Shops = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const address_1 = require("./address");
const inventory_1 = require("./inventory");
let Shops = class Shops extends typeorm_1.BaseEntity {
};
exports.Shops = Shops;
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
], Shops.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Shop_Code',
        type: 'nvarchar',
        unique: true,
        length: 100,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Shops.prototype, "shop_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Shop_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Shops.prototype, "shop_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Tax',
        type: 'nvarchar',
        length: 50,
        nullable: true
    }),
    (0, class_validator_1.Length)(50),
    __metadata("design:type", String)
], Shops.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Telephone',
        type: 'nvarchar',
        length: 18,
        nullable: true
    }),
    (0, class_validator_1.Length)(18),
    __metadata("design:type", String)
], Shops.prototype, "telephone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Telephone1',
        type: 'nvarchar',
        length: 18,
        nullable: true
    }),
    (0, class_validator_1.Length)(18),
    __metadata("design:type", String)
], Shops.prototype, "telephone1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Slogan',
        type: 'nvarchar',
        length: 100,
        nullable: true
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Shops.prototype, "slogan", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Shops.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_1.Address, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_1.Address)
], Shops.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_1.Inventory, (inventory) => inventory.shop),
    __metadata("design:type", Array)
], Shops.prototype, "inventories", void 0);
exports.Shops = Shops = __decorate([
    (0, typeorm_1.Entity)('Shops')
], Shops);
