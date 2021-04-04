import { Injectable } from '@nestjs/common';
import { CategoryEntity } from 'src/entities/category.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { EntityRepository } from 'typeorm';
import { CategoryRepo } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoryService {

  constructor(private _categoryRepo:CategoryRepo,  private _restaurantService: RestaurantService){}
  async create(createCategoryDto: CreateCategoryDto) {

    // let resturant = await this._restaurantService.findOne(1);

    // let category = new CategoryEntity();

    // category.name = createCategoryDto.name;
    // category.order = createCategoryDto.order;
    // category.Restaurant= resturant;



    // await this._categoryRepo.save(category)

    return {}//category;

  }


  //Get all category that belongs to the resturant
  async findAll() {
   // let resturant = await this._restaurantService.findOne(1);
   // return this._categoryRepo.find({ where: { Restaurant: resturant.id }, relations: ["Restaurant"] })
   return {}
  }

 async findOne(id: number) {

    return await this._categoryRepo.findOne(id) 
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    
  }
}
