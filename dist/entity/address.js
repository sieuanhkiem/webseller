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
exports.Address = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const city_1 = require("./city");
const district_1 = require("./district");
const ward_1 = require("./ward");
let Address = class Address extends typeorm_1.BaseEntity {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], Address.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Address_Code',
        type: 'nvarchar',
        nullable: false,
        unique: true,
        length: 100
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Address.prototype, "address_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Address_1',
        type: 'nvarchar',
        nullable: true,
        length: 255
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Address.prototype, "address_1", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Address_2',
        type: 'nvarchar',
        nullable: true,
        length: 255
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Address.prototype, "address_2", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Address_3',
        type: 'nvarchar',
        nullable: true,
        length: 255
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Address.prototype, "address_3", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Address.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Address.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_1.City, (city) => city.address, { nullable: true }),
    __metadata("design:type", city_1.City)
], Address.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_1.District, (district) => district.address, { nullable: true }),
    __metadata("design:type", district_1.District)
], Address.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ward_1.Ward, (ward) => ward.address, { nullable: true }),
    __metadata("design:type", ward_1.Ward)
], Address.prototype, "ward", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)('Address')
], Address);
