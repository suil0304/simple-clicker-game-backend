import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

@UseGuards(AuthGuard("jwt"))
@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    async getOne(@GetUser("sub") userId:number) {
        return this.service.getOne(userId);
    }

    @Patch()
    async update(@GetUser("sub") userId:number, @Body() userDTO:UpdateUserDTO) {
        return this.service.update(userId, userDTO);
    }

    @Delete()
    async delete(@GetUser("sub") userId:number) {
        return this.service.delete(userId);
    }
}
