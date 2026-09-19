import { Test, TestingModule } from '@nestjs/testing';
import { BindingsService } from './bindings.service';

describe('BindingsService', () => {
  let service: BindingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BindingsService],
    }).compile();

    service = module.get<BindingsService>(BindingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
