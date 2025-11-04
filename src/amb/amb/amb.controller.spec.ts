import { Test, TestingModule } from '@nestjs/testing';
import { AmbController } from './amb.controller';

describe('AmbController', () => {
  let controller: AmbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmbController],
    }).compile();

    controller = module.get<AmbController>(AmbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
