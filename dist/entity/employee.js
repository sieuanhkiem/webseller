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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let Employee = class Employee extends typeorm_1.BaseEntity {
};
exports.Employee = Employee;
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
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Employee_Code',
        type: 'nvarchar',
        unique: true,
        length: 100,
        nullable: false
    }),
    (0, class_validator_1.Length)(100),
    __metadata("design:type", String)
], Employee.prototype, "employee_code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Employee_Name',
        type: 'nvarchar',
        length: 255,
        nullable: false
    }),
    (0, class_validator_1.Length)(255),
    __metadata("design:type", String)
], Employee.prototype, "employee_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Sex',
        type: 'nchar',
        length: 10,
        nullable: true
    }),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", String)
], Employee.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Start_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Employee.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'End_Date',
        type: 'datetime',
        nullable: true
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Employee.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Birth_Day',
        type: 'nchar',
        length: 10,
        nullable: true
    }),
    (0, class_validator_1.Length)(10),
    __metadata("design:type", String)
], Employee.prototype, "birth_day", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Position',
        type: 'nvarchar',
        length: 50,
        nullable: true
    }),
    (0, class_validator_1.Length)(50),
    __metadata("design:type", String)
], Employee.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Active',
        type: 'bit',
        nullable: true,
        default: 1
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Is_Delete',
        type: 'bit',
        nullable: true,
        default: 0
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'Create_Date',
        type: 'datetime',
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP'
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Employee.prototype, "create_date", void 0);
exports.Employee = Employee = __decorate([
    (0, typeorm_1.Entity)('Employee')
], Employee);
