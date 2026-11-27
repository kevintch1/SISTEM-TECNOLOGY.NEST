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
import { SalesService } from './sales.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { ReplaceSaleDto } from './dto/replace-sale.dto.js';
import { UpdateSaleDto } from './dto/update-sale.dto.js';

@Controller('sales')
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CAJERO, UserRole.CLIENTE)
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO, UserRole.CLIENTE)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.findOne(id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() replaceSaleDto: ReplaceSaleDto,
  ) {
    return this.salesService.replace(id, replaceSaleDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CAJERO)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.remove(id);
  }
}
