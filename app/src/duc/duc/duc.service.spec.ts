import { Test, TestingModule } from '@nestjs/testing';
import { DucService } from './duc.service';

describe('DucService', () => {
  let service: DucService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DucService],
    }).compile();

    service = module.get<DucService>(DucService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
