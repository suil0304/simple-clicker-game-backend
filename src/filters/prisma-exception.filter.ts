import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): never {
    const context = host.switchToHttp();

    switch (exception.code) {
      case 'P2025':
        throw new NotFoundException('해당 데이터를 찾을 수 없습니다.');
      default:
        throw exception;
    }
  }
}
