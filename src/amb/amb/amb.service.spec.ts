import { Test, TestingModule } from '@nestjs/testing';
import { AmbService } from './amb.service';

describe('AmbService', () => {
  let service: AmbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmbService],
    }).compile();

    service = module.get<AmbService>(AmbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
