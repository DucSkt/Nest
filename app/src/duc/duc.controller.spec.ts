import { Test, TestingModule } from '@nestjs/testing';
import { DucController } from './duc.controller';

describe('Duc Controller', () => {
  let controller: DucController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DucController],
    }).compile();

    controller = module.get<DucController>(DucController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
