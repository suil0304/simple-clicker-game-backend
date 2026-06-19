import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserSafeDTO } from './dto/user-safe.dto';
import * as bcrypt from "bcrypt";
import { RegisterOrLoginDTO } from '../dto/register-or-login.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: number): Promise<UserSafeDTO> {
    return this.prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        nickname: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        id: id,
      },
    });
  }

  async update(id: number, userData: UpdateUserDTO): Promise<UserSafeDTO> {
    return this.prisma.user.update({
      select: {
        id: true,
        name: true,
        nickname: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        id: id,
      },
      data: {
        ...userData,
      },
    });
  }

  async remove(id: number, userData: RegisterOrLoginDTO): Promise<UserSafeDTO> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id
      }
    });

    const matched = await bcrypt.compare(userData.password, user.password);
    if(!matched) {
      throw new UnauthorizedException("로그인되어 있지 않습니다.");
    }

    return this.prisma.user.delete({
      select: {
        id: true,
        name: true,
        nickname: true,
        createdAt: true,
        updatedAt: true
      },
      where: {
        id: id,
      },
    });
  }
}
