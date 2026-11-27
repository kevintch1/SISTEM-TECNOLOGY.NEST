import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSupplierDto } from './dto/create-supplier.dto.js';
import { UpdateSupplierDto } from './dto/update-supplier.dto.js';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}
  create(createSupplierDTo: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: createSupplierDTo,
    });
  }

  findAll() {
    return this.prisma.supplier.findMany({
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.supplier.findUnique({
      where: { id },
    });
  }

  update(id: number, updateSupplierDto: UpdateSupplierDto) {
    return this.prisma.supplier.update({
      where: { id },
      data: updateSupplierDto,
    });
  }

  remove(id: number) {
    return this.prisma.supplier.delete({
      where: { id },
    });
  }
}
