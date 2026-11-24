import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';

import { CategoryModule } from './category/category.module.js';
import { ProductModule } from './product/product.module.js';
import { PurchaseDetailModule } from './purchase-detail/purchase-detail.module.js';
import { ConfigModule } from '@nestjs/config';


import { SaleDetailsModule } from './sale-details/sale-details.module.js';
import { SalesModule } from './sales/sales.module.js';
import { ClientsModule } from './clients/clients.module.js';
import { EmployeesModule } from './employees/employees.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();
@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com,
    // then run `npx @nestjs/observe link` to write your key pair into .env.

    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'sistem-nest',
    }),
    PrismaModule,
    CategoryModule,
    ProductModule,
    PurchaseDetailModule,


    SalesModule,
    SaleDetailsModule,
    ClientsModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
