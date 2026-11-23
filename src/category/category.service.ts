
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CategoryService {

  constructor(private readonly prisma: PrismaService) { }

  create(data: CreateCategoryDto) {
    return this.prisma.category.create({
      data
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: { id: 'asc' }
    });
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id }
    });
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id }
    });
  }
}
