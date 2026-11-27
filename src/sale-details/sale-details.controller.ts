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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '../generated/prisma/client.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { SaleDetailsService } from './sale-details.service.js';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto.js';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto.js';

@Controller('sale-details')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SaleDetailsController {
  constructor(private readonly saleDetailsService: SaleDetailsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  create(@Body() createSaleDetailDto: CreateSaleDetailDto) {
    return this.saleDetailsService.create(createSaleDetailDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAJERO, UserRole.CLIENTE)
  findAll() {
    return this.saleDetailsService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO, UserRole.CLIENTE)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.saleDetailsService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSaleDetailDto: CreateSaleDetailDto,
  ) {
    return this.saleDetailsService.replace(id, createSaleDetailDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDetailDto: UpdateSaleDetailDto,
  ) {
    return this.saleDetailsService.update(id, updateSaleDetailDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.saleDetailsService.remove(id);
  }
}
