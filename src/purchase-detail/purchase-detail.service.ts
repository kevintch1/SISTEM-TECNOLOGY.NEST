import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDetailDto } from './dto/create-purchase-detail.dto.js';
import { UpdatePurchaseDetailDto } from './dto/update-purchase-detail.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PurchaseDetailService {
  constructor(private readonly prisma: PrismaService) { }

  create(data: CreatePurchaseDetailDto) {
    return this.prisma.purchaseDetail.create({
      data
    });
  }

  findAll() {
    return this.prisma.purchaseDetail.findMany({
      include: {
        product: true,
        purchase: true
      }
    });
  }

  async findOne(id: number) {
    const detail = await this.prisma.purchaseDetail.findUnique({
      where: { id },
      include: {
        product: true,
        purchase: true
      }
    });

    if (!detail) {
      throw new NotFoundException('Registro no encontrado');
    }

    return detail;
  }

  update(id: number, data: UpdatePurchaseDetailDto) {
    return this.prisma.purchaseDetail.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.purchaseDetail.delete({
      where: { id }
    });
  }
}
