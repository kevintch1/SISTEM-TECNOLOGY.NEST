import { InternalServerErrorException } from '@nestjs/common';

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new InternalServerErrorException('JWT_SECRET no está configurado');
  }
  return secret;
}
