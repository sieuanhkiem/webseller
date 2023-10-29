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
exports.District = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const city_1 = require("./city");
const ward_1 = require("./ward");
const address_1 = require("./address");
let District = class District extends typeorm_1.BaseEntity {
};
exports.District = District;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid', {
        name: 'Id',
        generated: 'uuid',
        type: 'uniqueidentifier'
    }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'District_Code',
        unique: true,
        type: 'nvarchar',
        length: 100,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], District.prototype, "district_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'District_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], District.prototype, "district_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], District.prototype, "create_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_1.City, (city) => city.districts, { nullable: true }),
    __metadata("design:type", city_1.City)
], District.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ward_1.Ward, (ward) => ward.district),
    __metadata("design:type", Array)
], District.prototype, "wards", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => address_1.Address, (adress) => adress.district),
    __metadata("design:type", Array)
], District.prototype, "address", void 0);
exports.District = District = __decorate([
    (0, typeorm_1.Entity)('District')
], District);
