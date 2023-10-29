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
exports.Image = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Image = class Image extends typeorm_1.BaseEntity {
};
exports.Image = Image;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Image.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Image_Code',
        type: 'nvarchar',
        length: 100,
        unique: true,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Image.prototype, "image_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Image_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Image.prototype, "image_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Image',
        type: 'image',
        nullable: true
    }),
    __metadata("design:type", Buffer)
], Image.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Image_Type',
        type: 'int',
        unsigned: true,
        nullable: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], Image.prototype, "image_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Comment',
        type: 'nvarchar',
        length: 255,
        nullable: true
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Image.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Image.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Image.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Image_Default',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Image.prototype, "image_default", void 0);
exports.Image = Image = __decorate([
    (0, typeorm_1.Entity)('Image')
], Image);
