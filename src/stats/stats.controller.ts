import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatsService } from './stats.service';
import { SyncDataDTO } from './dto/sync-data.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../decorators/get-user.decorator';

@Controller('stats')
export class StatsController {
  constructor(private readonly service: StatsService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async getOne(@GetUser("sub") userId:number) {
    return this.service.getOne(userId);
  }

  @UseGuards(AuthGuard("jwt"))
  @Post('/sync')
  async doSync(
    @GetUser("sub") userId:number,
    @Body() syncData:SyncDataDTO
  ) {
    return this.service.doSync(userId, syncData);
  }

  async getDefaultData() {
    return this.service.getDefaultData();
  }
}
