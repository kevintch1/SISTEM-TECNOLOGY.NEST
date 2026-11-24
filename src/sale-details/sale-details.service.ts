import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class SaleDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.saleDetail.findMany();
  }
}
