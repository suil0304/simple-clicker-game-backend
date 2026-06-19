import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserSafeDTO } from './dto/user-safe.dto';

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

  async delete(id: number): Promise<UserSafeDTO> {
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
