import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PurchaseDetailService } from './purchase-detail.service.js';
import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto.js';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('purchase-detail')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'CAJERO')
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
