<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
=======
import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
>>>>>>> origin/master
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
<<<<<<< HEAD
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL must be set to connect to PostgreSQL.');
    }

    super({ adapter: new PrismaPg({ connectionString }) });
=======
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
>>>>>>> origin/master
  }
}
