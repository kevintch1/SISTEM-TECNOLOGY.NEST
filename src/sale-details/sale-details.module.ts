import { Module } from '@nestjs/common';
import { SaleDetailsController } from './sale-details.controller.js';
import { SaleDetailsService } from './sale-details.service.js';

@Module({
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule {}
