import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import type { Response } from 'express';
import { Prisma } from '../generated/prisma/client.js';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter<Prisma.PrismaClientKnownRequestError> {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    let httpException: ConflictException | NotFoundException;

    switch (exception.code) {
      case 'P2002':
        httpException = new ConflictException(
          'Ya existe un registro con ese valor único',
        );
        break;
      case 'P2025':
        httpException = new NotFoundException('Registro no encontrado');
        break;
      default:
        throw exception;
    }

    const response = host.switchToHttp().getResponse<Response>();
    response
      .status(httpException.getStatus())
      .json(httpException.getResponse());
  }
}
