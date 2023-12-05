import { Test, TestingModule } from '@nestjs/testing';
import { VarientService } from './varient.service';

describe('VarientService', () => {
  let service: VarientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VarientService],
    }).compile();

    service = module.get<VarientService>(VarientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
