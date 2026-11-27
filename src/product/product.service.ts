import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class ProductService {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateProductDto) {
    return this.prisma.product.create({
      data
    });
  }
  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true
      }
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true
      }
    });

    if (!product) {
      throw new NotFoundException('Registro no encontrado');
    }

    return product;
  }

  update(id: number, data: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data
    });
  }
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id }
    });
  }
}
