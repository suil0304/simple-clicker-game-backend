import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../generated/prisma';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(id: number): Promise<User> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, userData: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...userData,
      },
    });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
