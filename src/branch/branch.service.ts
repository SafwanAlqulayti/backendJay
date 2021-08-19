import { Injectable } from '@nestjs/common';
import { RestaurantBranchEntity } from 'src/entities/restaurantBranch.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { AwsContext } from 'twilio/lib/rest/accounts/v1/credential/aws';
import { EntityRepository, FindConditions } from 'typeorm';
import { CreateRestaurantBranchDto } from './dto/createRestauranBranchDto';
import { FindBranchDto } from './dto/findBranchDto';
import { RestaurantBranchRepository } from './restaurantBranch.repository';

@Injectable()
@EntityRepository(RestaurantBranchRepository)
export class BranchService {
    constructor(
        private readonly _restaurantBranchRepository: RestaurantBranchRepository,
        private _restaurantService: RestaurantService
    ) { }

    async findOne(findBranchDto): Promise<any> {
        return this._restaurantBranchRepository.findOne({id:"a1387e9a-9348-4455-b7c3-4f8c463565c6"})
    }
    findOne1(
    ): Promise<any> {
        return this._restaurantBranchRepository.find({where:{id:"a1387e9a-9348-4455-b7c3-4f8c463565c6"}});
    }
    async create(createRestaurantBranchDto: CreateRestaurantBranchDto) {
        let branch = new RestaurantBranchEntity()
        let restarunt = await this._restaurantService.findOne({ id: createRestaurantBranchDto.requestId })
        branch.branchName = createRestaurantBranchDto.branchName;
        branch.latitude = createRestaurantBranchDto.branclLatitude;
        branch.longitude = createRestaurantBranchDto.branchLongitude;
        branch.kind = createRestaurantBranchDto.kind;
        restarunt;
        await this._restaurantBranchRepository.save(branch)
    }
}
