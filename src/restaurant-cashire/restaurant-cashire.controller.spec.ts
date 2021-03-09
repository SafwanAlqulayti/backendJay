import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantCashireController } from './restaurant-cashire.controller';
import { RestaurantCashireService } from './restaurant-cashire.service';

describe('RestaurantCashireController', () => {
  let controller: RestaurantCashireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantCashireController],
      providers: [RestaurantCashireService],
    }).compile();

    controller = module.get<RestaurantCashireController>(RestaurantCashireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
