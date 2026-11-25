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

import { SupplierService } from './supplier.service.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';

@ApiTags('Suppliers')
@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar un proveedor' })
  @ApiResponse({ status: 201, description: 'Proveedor creado correctamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar todos los proveedores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores obtenida correctamente',
  })
  findAll() {
    return this.supplierService.findAll();
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
    return this.supplierService.findOne(id);
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
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, updateSupplierDto);
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
    return this.supplierService.remove(id);
  }
}
