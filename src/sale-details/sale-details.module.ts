import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { SaleDetailsController } from './sale-details.controller.js';
import { SaleDetailsService } from './sale-details.service.js';

@Module({
  imports: [AuthModule],
  controllers: [SaleDetailsController],
  providers: [SaleDetailsService],
})
export class SaleDetailsModule {}
