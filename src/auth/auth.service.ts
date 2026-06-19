import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterOrLoginDTO } from './dto/register-or-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly jwt:JwtService
    ) {}

    async register(registerData:RegisterOrLoginDTO):Promise<string> {
        const hashPassword = await bcrypt.hash(registerData.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: registerData.name,
                password: hashPassword,
                stats: {

                },
                upgrades: {

                },
                settings: {
                    
                }
            }
        });

        return this.jwt.signAsync({
            sub: user.id
        });
    }

    async login(loginData:RegisterOrLoginDTO):Promise<string> {
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

        return this.jwt.signAsync({
            sub: user.id
        });
    }
}
