import { Test, TestingModule } from '@nestjs/testing';
import { OrderCategoryDetailService } from './order-category-detail.service';

describe('OrderCategoryDetailService', () => {
  let service: OrderCategoryDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderCategoryDetailService],
    }).compile();

    service = module.get<OrderCategoryDetailService>(
      OrderCategoryDetailService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
