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
exports.initialize = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logging_1 = require("./config/logging");
const config_1 = __importDefault(require("./config/config"));
const city_1 = require("./entity/city");
const district_1 = require("./entity/district");
const ward_1 = require("./entity/ward");
// import msnodesqlv8 from 'mssql/msnodesqlv8'
const AppDataSource = new typeorm_1.DataSource({
    type: 'mssql',
    // driver: msnodesqlv8,
    host: config_1.default.sqlserver.host,
    username: config_1.default.sqlserver.user,
    password: config_1.default.sqlserver.pass,
    database: config_1.default.sqlserver.database,
    migrations: ['./dist/migrations/*.js'],
    entities: ['./dist/entity/*.js'],
    migrationsRun: true,
    migrationsTableName: `migration_table`,
    synchronize: false,
    logging: true,
    extra: {
        encrypt: false,
        // trustedConnection: true,
        validateConnection: false,
        trustServerCertificate: true,
    }
});
function initialize() {
    return __awaiter(this, void 0, void 0, function* () {
        let isConnect = false;
        try {
            if (!AppDataSource.isInitialized) {
                const dataSource = yield AppDataSource.initialize();
                isConnect = dataSource.isInitialized;
                // if(refresh) {
                //     await dataSource.manager.query('EXEC sp_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT ALL"');
                //     dataSource.entityMetadatas.forEach(ent => {
                //         ent.foreignKeys.reduce(async function (current: Promise<never[]>, foreign: ForeignKeyMetadata) {
                //             await dataSource.manager.query(
                //                 `
                //                 IF (OBJECT_ID('${foreign.name}', 'F') IS NOT NULL)
                //                     BEGIN
                //                         ALTER TABLE ${foreign.entityMetadata.tablePath} DROP CONSTRAINT ${foreign.name}
                //                     END
                //                 `
                //             )
                //             return current
                //         }, Promise.resolve([]))
                //         .then( async function (result) {
                //             await dataSource.manager.query(`
                //                 IF object_id('${ent.tablePath}', 'u') IS NOT NULL
                //                 BEGIN
                //                     DROP TABLE ${ent.tablePath}
                //                 END
                //             `);
                //         });
                //     });
                //     await dataSource.synchronize();
                // }
                yield initData(dataSource);
                if (isConnect)
                    yield dataSource.destroy();
            }
        }
        catch (error) {
            if (isConnect)
                yield AppDataSource.destroy();
            logging_1.logging.error(`Set up database faild: ${error}`);
        }
    });
}
exports.initialize = initialize;
function initData(dataSource) {
    return __awaiter(this, void 0, void 0, function* () {
        const repositoryCity = dataSource.getRepository(city_1.City);
        const repositoryDistrict = dataSource.getRepository(district_1.District);
        const repositoryWard = dataSource.getRepository(ward_1.Ward);
        const countCity = yield repositoryCity.count();
        const countDistrict = yield repositoryDistrict.count();
        const countWard = yield repositoryWard.count();
        if (countCity == 0 && countDistrict == 0 && countWard == 0) {
            yield repositoryWard.createQueryBuilder().delete().execute();
            yield repositoryDistrict.createQueryBuilder().delete().execute();
            yield repositoryCity.createQueryBuilder().delete().execute();
            const city = yield repositoryCity.create({
                city_code: '700000',
                city_name: 'TP.Hồ Chí Minh'
            }).save();
            const data = [
                {
                    '766': 'Quận Bình Tân',
                    'ward': [
                        { '27436': 'Phường Bình Hưng Hòa' },
                        { '27439': 'Phường Bình Hưng Hoà A' },
                        { '27442': 'Phường Bình Hưng Hòa B' },
                        { '27445': 'Phường Bình Trị Đông' },
                        { '27448': 'Phường Bình Trị Đông A' },
                        { '27451': 'Phường Bình Trị Đông B' },
                        { '27454': 'Phường Tân Tạo' },
                        { '27457': 'Phường Tân Tạo A' },
                        { '27460': 'Phường An Lạc' },
                        { '27463': 'Phường An Lạc A' }
                    ]
                },
                {
                    '777': 'Quận Tân Bình',
                    'ward': [
                        { '26977': 'Phường 01' },
                        { '26965': 'Phường 02' },
                        { '26980': 'Phường 03' },
                        { '26968': 'Phường 04' },
                        { '26989': 'Phường 05' },
                        { '26995': 'Phường 06' },
                        { '26986': 'Phường 07' },
                        { '26998': 'Phường 08' },
                        { '27001': 'Phường 09' },
                        { '26992': 'Phường 10' },
                        { '26983': 'Phường 11' },
                        { '26971': 'Phường 12' },
                        { '26974': 'Phường 13' },
                        { '27004': 'Phường 14' },
                        { '27007': 'Phường 15' }
                    ]
                }
            ];
            for (let record of data) {
                const districtCode = Object.keys(record)[0];
                const disctrictValue = Object.values(record)[0];
                const district = new district_1.District();
                district.district_code = districtCode;
                district.district_name = disctrictValue;
                district.city = city;
                yield repositoryDistrict.save(district);
                for (let w of record.ward) {
                    const wardCode = Object.keys(w)[0];
                    const wardValue = Object.values(w)[0];
                    const ward = new ward_1.Ward();
                    ward.ward_name = wardValue;
                    ward.ward_code = wardCode;
                    ward.city = city;
                    ward.district = district;
                    yield repositoryWard.save(ward);
                }
            }
            ;
        }
    });
}
exports.default = AppDataSource;
