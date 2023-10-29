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
exports.ProductColor = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const inventory_1 = require("./inventory");
let ProductColor = class ProductColor extends typeorm_1.BaseEntity {
};
exports.ProductColor = ProductColor;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ProductColor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Color_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], ProductColor.prototype, "color_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Color_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], ProductColor.prototype, "color_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], ProductColor.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], ProductColor.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_1.Inventory, (inventory) => inventory.product_color),
    __metadata("design:type", Array)
], ProductColor.prototype, "inventories", void 0);
exports.ProductColor = ProductColor = __decorate([
    (0, typeorm_1.Entity)('Product_Color')
], ProductColor);
