import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  const prismaMock = {
    sale: { findMany: vi.fn().mockResolvedValue([]) },
    saleDetail: { findMany: vi.fn().mockResolvedValue([]) },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/sales (GET)', () => {
    return request(app.getHttpServer()).get('/sales').expect(200).expect([]);
  });

  it('/sale-details (GET)', () => {
    return request(app.getHttpServer())
      .get('/sale-details')
      .expect(200)
      .expect([]);
  });

  afterEach(async () => {
    await app.close();
  });
});
