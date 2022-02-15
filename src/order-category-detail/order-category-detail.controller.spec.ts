import { Test, TestingModule } from '@nestjs/testing';
import { OrderCategoryDetailController } from './order-category-detail.controller';
import { OrderCategoryDetailService } from './order-category-detail.service';

describe('OrderCategoryDetailController', () => {
  let controller: OrderCategoryDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCategoryDetailController],
      providers: [OrderCategoryDetailService],
    }).compile();

    controller = module.get<OrderCategoryDetailController>(
      OrderCategoryDetailController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
