import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantFileController } from '../restaurant-file.controller';

describe('ResaurantFileController', () => {
  let controller: RestaurantFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantFileController],
    }).compile();

    controller = module.get<RestaurantFileController>(RestaurantFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
