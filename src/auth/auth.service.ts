import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { getJwtSecret } from './jwt-secret.js';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, password: string) {
    return this.createUser(email, password, UserRole.CLIENTE);
  }

  async createUser(email: string, password: string, role: UserRole) {
    const passwordHash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, passwordHash, role },
      select: { id: true, email: true, role: true },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      getJwtSecret(),
      { expiresIn: '8h', algorithm: 'HS256' },
    );
    return { token };
  }

  createPrivilegedUser(createUserDto: CreateUserDto) {
    return this.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.role,
    );
  }
}
