import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserRole } from '../../generated/prisma/client.js';
import type { AuthTokenPayload } from '../auth.types.js';
import { getJwtSecret } from '../jwt-secret.js';

type AuthenticatedRequest = Request & { user?: AuthTokenPayload };

function isAuthTokenPayload(payload: unknown): payload is AuthTokenPayload {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  const claims = payload as Record<string, unknown>;
  return (
    typeof claims.id === 'number' &&
    typeof claims.email === 'string' &&
    typeof claims.role === 'string' &&
    Object.values(UserRole).some((role) => role === claims.role)
  );
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const header = request.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const secret = getJwtSecret();
    let payload: string | jwt.JwtPayload;
    try {
      payload = jwt.verify(token, secret, { algorithms: ['HS256'] });
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    if (!isAuthTokenPayload(payload)) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    request.user = payload;
    return true;
  }
}
