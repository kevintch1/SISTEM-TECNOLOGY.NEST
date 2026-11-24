import { Controller, Get } from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service.js';

@Controller('sale-details')
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Get()
  findAll() {
    return this.saleDetailsService.findAll();
  }
}
