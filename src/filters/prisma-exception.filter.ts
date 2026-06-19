import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { ExceptionMeta } from '../types/exception-meta';

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
      case 'P2002':
        const meta = exception.meta as ExceptionMeta | undefined;
        if(meta?.driverAdapterError?.cause?.constraint?.index) {
          const index = meta.driverAdapterError.cause.constraint.index;
          switch(index) {
            case "User_name_key":
              throw new ConflictException("이미 존재하는 계정입니다.");
            default:
              throw new ConflictException(`이미 존재하는 데이터입니다: ${index}`);
          }
        }
        throw new ConflictException("중복된 데이터가 있습니다.");
      default:
        throw exception;
    }
  }
}
