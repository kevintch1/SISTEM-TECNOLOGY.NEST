import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service.js';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    vi.stubEnv('DATABASE_URL', 'postgresql://test:test@localhost:5432/test');
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });
});
