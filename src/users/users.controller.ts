import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';
import { RegisterOrLoginDTO } from '../dto/register-or-login.dto';

@UseGuards(AuthGuard("jwt"))
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    async getOne(@GetUser("sub") userId:number) {
        return this.service.getOne(userId);
    }

    @Put()
    async update(@GetUser("sub") userId:number, @Body() userData:UpdateUserDTO) {
        return this.service.update(userId, userData);
    }

    @Delete()
    async delete(
        @GetUser("sub") userId:number,
        @Body() userData:RegisterOrLoginDTO
    ) {
        return this.service.delete(userId, userData);
    }
}
