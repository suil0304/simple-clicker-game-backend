import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Stats } from '../generated/prisma';
import { CriticalUtil } from './utils/critical.util';
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

    const addGold =
      CriticalUtil.calcCriticalGold(
        syncData.deltaClickCount * result.goldPerClick,
        result.criticalMult,
        result.criticalRate,
      ) +
      syncData.deltaSecondCount * result.goldPerSecond;

    return this.prisma.stats.update({
      where: {
        userId: userId,
      },
      data: {
        gold: {
          increment: addGold,
        },
        clickCount: {
          increment: syncData.deltaClickCount,
        },
      },
    });
  }
}
