import { ApiTags } from '@nestjs/swagger';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { RestaurantBranchEntity } from 'src/entities/restaurantBranch.entity';
import { BranchService } from './branch.service';
import { CreateRestaurantBranchDto } from './dto/createRestauranBranchDto';
import { FindBranchDto } from './dto/findBranchDto';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly _branchService: BranchService) {}

  @Post()
  async create(@Body() createRestaurantBranchDto: CreateRestaurantBranchDto) {
    return this._branchService.create(createRestaurantBranchDto);
  }

  @Get(':branchId')
  async getBranch(@Param() findBranchDto): Promise<any> {
    const result = await this._branchService.findOne1();
    console.log(result);
    return result;
  }
}
