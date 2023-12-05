import { Test, TestingModule } from '@nestjs/testing';
import { VarientController } from './varient.controller';
import { VarientService } from './varient.service';

describe('VarientController', () => {
  let controller: VarientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VarientController],
      providers: [VarientService],
    }).compile();

    controller = module.get<VarientController>(VarientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
