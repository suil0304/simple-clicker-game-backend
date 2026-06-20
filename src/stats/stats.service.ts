import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Stats } from '../generated/prisma';
import { SyncDataDTO } from './dto/sync-data.dto';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOne(userId: number): Promise<Stats> {
    return this.prisma.stats.findUniqueOrThrow({
      where: {
        userId: userId,
      },
    });
  }

  async doSync(userId: number, syncData: SyncDataDTO): Promise<Stats> {
    const result = await this.getOne(userId);

    let calcAddMoney = 0;
    for(const clickData of syncData.clickDatas) {
      calcAddMoney += Math.floor(result.goldPerClick * (clickData.isCritical ? result.criticalMult : 1));
    }

    if(syncData.totalClickAddGold !== calcAddMoney) {
      throw new BadRequestException(`검증 골드 값이 일치하지 않습니다.\n요청: ${syncData.totalClickAddGold}, 검증: ${calcAddMoney}`);
    }

    const addGold = syncData.totalClickAddGold + syncData.deltaSecondCount * result.goldPerSecond;

    return this.prisma.stats.update({
      where: {
        userId: userId,
      },
      data: {
        gold: {
          increment: addGold,
        },
        clickCount: {
          increment: syncData.clickDatas.length,
        },
      },
    });
  }
}
