import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

import { PurchaseService } from './purchase.service.js';
import { CreatePurchaseDto } from './dto/create-purchase.dto.js';
import { UpdatePurchaseDto } from './dto/update-purchase.dto.js';

@ApiTags('Purchases')
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar una compra' })
  @ApiResponse({ status: 201, description: 'Compra creada correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos los proveedores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores obtenida correctamente',
  })
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un proveedor por su identificador' })
  @ApiParam({
    name: 'id',
    description: 'Identificador numérico del proveedor',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor consultado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Identificador inválido' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proveedor' })
  @ApiParam({
    name: 'id',
    description: 'Identificador numérico del proveedor',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor actualizado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Datos o identificador inválidos' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proveedor' })
  @ApiParam({
    name: 'id',
    description: 'Identificador numérico del proveedor',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Proveedor eliminado correctamente',
  })
  @ApiResponse({ status: 400, description: 'Identificador inválido' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseService.remove(id);
  }
}
