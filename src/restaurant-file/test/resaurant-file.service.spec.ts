import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantFileService } from '../restaurant-file.service';

describe('ResaurantFileService', () => {
  let service: RestaurantFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantFileService],
    }).compile();

    service = module.get<RestaurantFileService>(RestaurantFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
