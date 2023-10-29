"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const logging_1 = require("../config/logging");
class BaseService {
    constructor() {
        this.dataSource = undefined;
    }
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dataSource == undefined || !data_source_1.default.isInitialized) {
                    this.dataSource = yield data_source_1.default.initialize();
                    logging_1.logging.info('connect database success');
                }
                // else {
                //     this.dataSource?.initialize();
                // }
            }
            catch (error) {
                logging_1.logging.error(`connect to database faild: ${error}`);
            }
        });
    }
    disconnectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dataSource != undefined && this.dataSource.isInitialized) {
                    yield this.dataSource.destroy();
                    logging_1.logging.info('disconnect database success');
                }
            }
            catch (error) {
                logging_1.logging.error(`disconnect to database faild: ${error}`);
            }
        });
    }
    createRepository(model) {
        try {
            if (this.dataSource != undefined && this.dataSource.isInitialized)
                return this.dataSource.getRepository(model);
            throw new Error('database is not connect');
        }
        catch (error) {
            logging_1.logging.error(`Get repository faild: ${error}`);
        }
    }
    Rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.dataSource != undefined && this.dataSource.isInitialized) {
                    const query = this.dataSource.createQueryRunner();
                    yield query.startTransaction();
                    yield query.rollbackTransaction();
                }
                throw new Error('database is not connect');
            }
            catch (error) {
                logging_1.logging.error(`Get repository faild: ${error}`);
            }
        });
    }
}
exports.default = BaseService;
