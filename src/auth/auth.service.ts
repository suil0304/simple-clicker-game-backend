import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterOrLoginDTO } from '../dto/register-or-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtContainer } from '../types/jwt-container';
import { JwtUtil } from './utils/jwt.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly jwt:JwtService
    ) {}

    async register(registerData:RegisterOrLoginDTO):Promise<JwtContainer> {
        const hashPassword = await bcrypt.hash(registerData.password, 10);

        return this.prisma.$transaction(async (db) => {
            const user = await db.user.create({
                data: {
                    name: registerData.name,
                    password: hashPassword
                }
            });

            await db.stats.create({
                data: {
                    userId: user.id
                }
            });

            await db.upgrade.create({
                data: {
                    userId: user.id
                }
            });

            await db.setting.create({
                data: {
                    userId: user.id
                }
            });

            const token = await this.jwt.signAsync({
                sub: user.id
            });

            return JwtUtil.getJwtContainer(token);
        });
    }

    async login(loginData:RegisterOrLoginDTO):Promise<JwtContainer> {
        const user = await this.prisma.user.findUnique({
            where: {
                name: loginData.name
            }
        });

        if(!user) {
            throw new UnauthorizedException("이름 또는 비밀번호가 일치하지 않습니다.");
        }

        const matched = await bcrypt.compare(loginData.password, user.password);

        if(!matched) {
            throw new UnauthorizedException("이름 또는 비밀번호가 일치하지 않습니다.");
        }

        const token = await this.jwt.signAsync({
            sub: user.id
        });

        return JwtUtil.getJwtContainer(token);
    }
}
