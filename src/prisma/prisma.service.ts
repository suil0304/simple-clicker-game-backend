import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly config:ConfigService) {
    const adapter = new PrismaMariaDb(config.getOrThrow<string>("database.url"));
    super({ adapter });
  }
}
