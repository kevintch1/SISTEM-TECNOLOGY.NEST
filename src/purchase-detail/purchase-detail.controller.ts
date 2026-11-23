import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PurchaseDetailService } from './purchase-detail.service.js';
import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto.js';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto.js';

@Controller('purchase-detail')
export class PurchaseDetailController {
  constructor(private readonly purchaseDetailService: PurchaseDetailService) { }

  @Post()
  create(@Body() createPurchaseDetailDto: CreatePurchaseDetailDto) {
    return this.purchaseDetailService.create(createPurchaseDetailDto);
  }

  @Get()
  findAll() {
    return this.purchaseDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseDetailService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDetailDto: UpdatePurchaseDetailDto) {
    return this.purchaseDetailService.update(+id, updatePurchaseDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseDetailService.remove(+id);
  }
}
