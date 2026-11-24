import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SaleDetailsService } from './sale-details.service.js';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto.js';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto.js';

@Controller('sale-details')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Post()
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailsService.create(createSaleDetailDto);
  }

  @Get()
  findAll() {
    return this.saleDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleDetailsService.findOne(id);
  }

  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSaleDetailDto: CreateSaleDetailDto,
  ) {
    return this.saleDetailsService.replace(id, createSaleDetailDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDetailDto: UpdateSaleDetailDto,
  ) {
    return this.saleDetailsService.update(id, updateSaleDetailDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.saleDetailsService.remove(id);
  }
}
