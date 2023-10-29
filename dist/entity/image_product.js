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
exports.ImageProduct = void 0;
const typeorm_1 = require("typeorm");
const product_1 = require("./product");
const image_1 = require("./image");
const class_validator_1 = require("class-validator");
let ImageProduct = class ImageProduct extends typeorm_1.BaseEntity {
};
exports.ImageProduct = ImageProduct;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ImageProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_1.Product, (product) => product, { onDelete: 'CASCADE' }),
    __metadata("design:type", product_1.Product)
], ImageProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => image_1.Image, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", image_1.Image)
], ImageProduct.prototype, "images", void 0);
exports.ImageProduct = ImageProduct = __decorate([
    (0, typeorm_1.Entity)('Image_Product')
], ImageProduct);
