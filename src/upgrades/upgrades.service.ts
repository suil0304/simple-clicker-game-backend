import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpgradeDTO } from './dto/upgrade.dto';
import { UpgradeUtil } from './utils/upgrade.util';
import { upgradeData, upgradeDataKeys } from './data/upgrade.data';
import { UpgradeLevelKey } from './types/upgrade-level-key';
import { UpgradeKey } from './types/upgrade-key';
import { UpgradeInfo } from './types/upgrade-info';

@Injectable()
export class UpgradesService {
    constructor(private readonly prisma:PrismaService) {}

    async getUpgrades(userId:number):Promise<UpgradeInfo[]> {
        const [userStats, upgradesLevelData] = await Promise.all([
            this.prisma.stats.findUniqueOrThrow({
                where: {
                    userId: userId
                }
            }),
            this.prisma.upgrade.findUniqueOrThrow({
                where: {
                    userId: userId
                }
            })
        ]);
        const infos:UpgradeInfo[] = [];
        
        for(const key of upgradeDataKeys) {
            const upgradeLevelType = `${key}Level` as UpgradeLevelKey;

            const curUpgradeData = upgradeData[key];

            infos.push(UpgradeUtil.getCurUpgradeInfo(
                upgradesLevelData[upgradeLevelType],
                userStats.gold,
                key,
                curUpgradeData
            ));
        }

        return infos;
    }

    async getUpgrade(userId:number, upgradeKey:UpgradeKey):Promise<UpgradeInfo> {
        const userStats = await this.prisma.stats.findUniqueOrThrow({
            where: {
                userId: userId
            }
        });
        const upgradesLevelData = await this.prisma.upgrade.findUniqueOrThrow({
            where: {
                userId: userId
            }
        });

        const upgradeLevelType = `${upgradeKey}Level` as UpgradeLevelKey;

        const curUpgradeData = upgradeData[upgradeKey];

        return UpgradeUtil.getCurUpgradeInfo(
            upgradesLevelData[upgradeLevelType],
            userStats.gold,
            upgradeKey,
            curUpgradeData
        );
    }

    async buyUpgrade(userId:number, upgradeType:UpgradeDTO):Promise<UpgradeInfo> {
        return this.prisma.$transaction(async (db) => {
            const userStats = await db.stats.findUniqueOrThrow({
                where: {
                    userId: userId
                }
            });
            const userUpgrades = await db.upgrade.findUniqueOrThrow({
                where: {
                    userId: userId
                }
            });

            const upgradeKey:UpgradeKey = upgradeType.upgradeKey;
            const upgradeLevelKey:UpgradeLevelKey = `${upgradeKey}Level`;

            const curUpgradeData = upgradeData[upgradeKey];

            const curPrice = UpgradeUtil.calcPrice(
                userUpgrades[upgradeLevelKey],
                curUpgradeData['base-price'],
                curUpgradeData['mult-price']
            );

            if(curPrice > userStats.gold) {
                throw new ConflictException("구매하려는 업그레이드의 가격이 현재 소지 중인 골드보다 높습니다.");
            }

            const nextValue = UpgradeUtil.calcValue(
                userUpgrades[upgradeLevelKey] + 1,
                curUpgradeData['base-value'],
                curUpgradeData['mult-value'],
                curUpgradeData['type-value']
            );

            await db.upgrade.update({
                where: {
                    userId: userId
                },
                data: {
                    [upgradeLevelKey]: {
                        increment: 1
                    }
                }
            });
            await db.stats.update({
                where: {
                    userId: userId
                },
                data: {
                    gold: {
                        increment: -curPrice
                    },
                    [upgradeKey]: nextValue
                }
            });

            return UpgradeUtil.getNextUpgradeInfo(
                userUpgrades[upgradeLevelKey],
                userStats.gold - curPrice,
                upgradeKey,
                curUpgradeData
            );
        });
    }
}
