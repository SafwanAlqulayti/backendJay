import { Repository } from 'typeorm';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'aws-sdk/clients/inspector';
import { UserRole } from 'src/auth/user-role.enum';
import { BranchService } from 'src/branch/branch.service';
import { CategoryEntity } from 'src/entities/category.entity';
import { RestaurantService } from 'src/restaurant/restaurant.service';
import { EntityRepository } from 'typeorm';
import { CategoryRepo } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetById } from './dto/getById.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoryService {
  @InjectRepository(CategoryEntity)
  private readonly _categoryRepo: Repository<CategoryEntity>

  constructor(
    private _restaurantService: RestaurantService,
    private _restaurantBranchService: BranchService
  ) { }
  async create(createCategoryDto: CreateCategoryDto) {

    let resturant = await this._restaurantBranchService.findOne(createCategoryDto.restaurantBranchId);

    let category = new CategoryEntity();

    category.name = createCategoryDto.name;
    category.categoryOrder = createCategoryDto.order;
    category.RestaurantEntity = resturant;



    await this._categoryRepo.save(category)

    return category;

  }


  //Get all category that belongs to the resturant
  async findAll(getById: GetById) {
    let resturant = await this._restaurantService.findOne({ id: getById.restaurantId });
    console.log(resturant)
    return this._categoryRepo.find({ where: { RestaurantEntity: resturant.id }, relations: ["RestaurantEntity"], order: { categoryOrder: 'ASC' } })
  }

  async findOne(id: UUID) {
    let category = await this._categoryRepo.findOne(id)
    if (!category) {
      throw new BadRequestException('Category is not exist')
    }
    return category
  }

  //get the resturant that belongs to spicific category
  async findWithRelation(categoryId) {

    let category = await this._categoryRepo.find({ where: { id: categoryId }, relations: ["RestaurantEntity"] })

    return category

  }

  async update(updateCategoryDto: UpdateCategoryDto, user) {

    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }
    let category = await this.findOne(updateCategoryDto.categoryId)
    category.name = updateCategoryDto.name
    category.categoryOrder = updateCategoryDto.order
    await this._categoryRepo.save(category)

    return category
  }

  async delete(id, user) {
    if (!user.user_role.includes(UserRole.ADMIN)) {
      throw new UnauthorizedException()
    }

    const queryBuilder = await this._categoryRepo.createQueryBuilder()
      .update(CategoryEntity)
      .set({ IsActive: true })
      .where({ id: id }).execute();
    return true;
  }
}
