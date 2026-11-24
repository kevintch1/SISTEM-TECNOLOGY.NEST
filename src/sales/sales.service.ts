import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDto } from './dto/create-sale.dto.js';
import { ReplaceSaleDto } from './dto/replace-sale.dto.js';
import { UpdateSaleDto } from './dto/update-sale.dto.js';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    try {
      return await this.prisma.sale.create({ data: createSaleDto });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  findAll() {
    return this.prisma.sale.findMany({
      include: { client: true, employee: true, details: true },
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: { client: true, employee: true, details: true },
    });

    if (!sale) {
      throw new NotFoundException(`Sale ${id} not found`);
    }

    return sale;
  }

  async replace(id: number, replaceSaleDto: ReplaceSaleDto) {
    try {
      return await this.prisma.sale.update({
        where: { id },
        data: replaceSaleDto,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    try {
      return await this.prisma.sale.update({
        where: { id },
        data: updateSaleDto,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.sale.delete({ where: { id } });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  private handleWriteError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Sale not found');
      }

      if (error.code === 'P2003') {
        throw new BadRequestException(
          'The sale references a missing client or employee, or still has details',
        );
      }
    }

    throw error;
  }
}
