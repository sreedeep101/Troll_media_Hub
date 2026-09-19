import { Test, TestingModule } from '@nestjs/testing';
import { BindingsController } from './bindings.controller';

describe('BindingsController', () => {
  let controller: BindingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BindingsController],
    }).compile();

    controller = module.get<BindingsController>(BindingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
