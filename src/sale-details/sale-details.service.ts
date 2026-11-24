import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto.js';
import { UpdateSaleDetailDto } from './dto/update-sale-detail.dto.js';

@Injectable()
export class SaleDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDetailDto: CreateSaleDetailDto) {
    try {
      return await this.prisma.saleDetail.create({ data: createSaleDetailDto });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  findAll() {
    return this.prisma.saleDetail.findMany({
      include: { sale: true, product: true },
    });
  }

  async findOne(id: number) {
    const saleDetail = await this.prisma.saleDetail.findUnique({
      where: { id },
      include: { sale: true, product: true },
    });

    if (!saleDetail) {
      throw new NotFoundException(`Sale detail ${id} not found`);
    }

    return saleDetail;
  }

  async replace(id: number, createSaleDetailDto: CreateSaleDetailDto) {
    try {
      return await this.prisma.saleDetail.update({
        where: { id },
        data: createSaleDetailDto,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async update(id: number, updateSaleDetailDto: UpdateSaleDetailDto) {
    try {
      return await this.prisma.saleDetail.update({
        where: { id },
        data: updateSaleDetailDto,
      });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.saleDetail.delete({ where: { id } });
    } catch (error) {
      this.handleWriteError(error);
    }
  }

  private handleWriteError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Sale detail not found');
      }

      if (error.code === 'P2003') {
        throw new BadRequestException(
          'The sale detail references a missing sale or product',
        );
      }
    }

    throw error;
  }
}
