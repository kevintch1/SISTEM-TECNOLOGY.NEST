import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createClientDto: CreateClientDto) {
    return this.prisma.client.create({ data: createClientDto });
  }

  findAll() {
    return this.prisma.client.findMany();
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return client;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.prisma.client.update({ where: { id }, data: updateClientDto });
  }

  remove(id: number) {
    return this.prisma.client.delete({ where: { id } });
  }
}
