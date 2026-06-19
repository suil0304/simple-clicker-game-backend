import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        JwtModule.registerAsync({
            inject: [ConfigService, JwtStrategy],
            useFactory:(config:ConfigService, _:JwtStrategy) => {
                return {
                    secret: config.getOrThrow("jwt.secret"),
                    signOptions: {
                        expiresIn: config.getOrThrow("jwt.expiresIn")
                    }
                }
            },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
