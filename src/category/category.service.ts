import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UUID } from 'aws-sdk/clients/inspector';
import { UserRole } from 'src/auth/user-role.enum';
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

    let resturant = await this._restaurantService.findOne({id:createCategoryDto.restaurantEntity});

    // let category = new CategoryEntity();

    // category.name = createCategoryDto.name;
    // category.order = createCategoryDto.order;
    // category.Restaurant= resturant;



    // await this._categoryRepo.save(category)

    return {}//category;

  }


  //Get all category that belongs to the resturant
  async findAll(getById) {
    let resturant = await this._restaurantService.findOne(getById);
    return this._categoryRepo.find({ where: { Restaurant: resturant.id }, relations: ["Restaurant"] })
  }

 async findOne(id: UUID) {

    return await this._categoryRepo.findOne(id) 
  }

  async update(updateCategoryDto: UpdateCategoryDto ,user) {

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    } 
    let category = await this.findOne(updateCategoryDto.categoryId)
    category.name = updateCategoryDto.name
    category.order = updateCategoryDto.order
    await this._categoryRepo.save(category)

    return category
  }

 async delete(id,user) {
    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }

    const queryBuilder = await this._categoryRepo.createQueryBuilder()
      .update(CategoryEntity)
      .set({ IsDeleted: true })
      .where({ id: id}).execute();
    return true;    
  }
}
