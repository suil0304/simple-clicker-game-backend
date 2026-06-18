import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { UpgradesModule } from './upgrades/upgrades.module';
import { StatsModule } from './stats/stats.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      load: [jwtConfig, databaseConfig],
      isGlobal: true
    }),
    UsersModule,
    StatsModule,
    UpgradesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
