import BaseService from './base.service';
import { logging } from '../config/logging';
import { Repository } from 'typeorm';
import { Ward } from '../entity/ward';

export default class WardService extends BaseService {
    public async GetWardByDistrictCodeAndCityCode(districtCode: string, cityCode: string): Promise<Ward[] | undefined> {
        try {
            await super.connectDatabase();
            const repositoryWard: Repository<Ward> = this.dataSource?.getRepository(Ward) as Repository<Ward>;
            const wards: Ward[] = await repositoryWard.createQueryBuilder('ward')
                                                    .innerJoin('ward.district', 'district')
                                                    .innerJoin('ward.city', 'city')
                                                    .where('city.city_code = :cityCode and district.district_code = :districtCode', { cityCode, districtCode })
                                                    .getMany();
            await super.disconnectDatabase();
            return wards;
        } 
        catch (error: unknown) {
            logging.error(`[${WardService.name}].[${this.GetWardByDistrictCodeAndCityCode.name}]: ${error}`);
            return [];
        }
    }
}