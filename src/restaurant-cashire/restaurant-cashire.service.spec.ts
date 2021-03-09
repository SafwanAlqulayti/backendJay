import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantCashireService } from './restaurant-cashire.service';

describe('RestaurantCashireService', () => {
  let service: RestaurantCashireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantCashireService],
    }).compile();

    service = module.get<RestaurantCashireService>(RestaurantCashireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
