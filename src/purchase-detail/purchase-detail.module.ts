import { Module } from '@nestjs/common';
import { PurchaseDetailService } from './purchase-detail.service.js';
import { PurchaseDetailController } from './purchase-detail.controller.js';

@Module({
  controllers: [PurchaseDetailController],
  providers: [PurchaseDetailService],
})
export class PurchaseDetailModule {}
