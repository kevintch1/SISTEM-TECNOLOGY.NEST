import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreatePurchaseDto } from './dto/create-purchase.dto.js';
import { UpdatePurchaseDto } from './dto/update-purchase.dto.js';

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPurchaseDto: CreatePurchaseDto) {
    return this.prisma.purchase.create({
      data: createPurchaseDto,
    });
  }

  findAll() {
    return this.prisma.purchase.findMany({
      where: { deletedAt: null },
      orderBy: { id: 'asc' },
    });
  }

  findOne(id: number) {
    return this.prisma.purchase.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return this.prisma.purchase.update({
      where: { id },
      data: updatePurchaseDto,
    });
  }

  remove(id: number) {
    return this.prisma.purchase.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
