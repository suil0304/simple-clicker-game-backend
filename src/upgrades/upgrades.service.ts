import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpgradeDTO } from './dto/upgrade.dto';
import { UpgradeUtil } from './utils/upgrade.util';
import { upgradeDatas, upgradeDataKeys } from './data/upgrade.data';
import { UpgradeLevelKey } from './types/upgrade-level-key';
import { UpgradeKey } from './types/upgrade-key';
import { UpgradeInfo } from './types/upgrade-info';
import { GuestBuyUpgradeDTO } from './dto/guest-buy-upgrade.dto';
import { GuestUpgradeDataDTO } from './dto/guest-upgrade-data.dto';
import { UpgradeInfoContainer } from './types/upgrade-info-container';

@Injectable()
export class UpgradesService {
    constructor(private readonly prisma:PrismaService) {}

    async getAll(userId:number):Promise<UpgradeInfo[]> {
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

            const curUpgradeData = upgradeDatas[key];

            infos.push(UpgradeUtil.getCurUpgradeInfo(
                upgradesLevelData[upgradeLevelType],
                userStats.gold,
                key,
                curUpgradeData
            ));
        }

        return infos;
    }

    async getOne(userId:number, upgradeKey:UpgradeKey):Promise<UpgradeInfo> {
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

        const curUpgradeData = upgradeDatas[upgradeKey];

        return UpgradeUtil.getCurUpgradeInfo(
            upgradesLevelData[upgradeLevelType],
            userStats.gold,
            upgradeKey,
            curUpgradeData
        );
    }

    async buyUpgrade(userId:number, upgradeType:UpgradeDTO):Promise<UpgradeInfoContainer> {
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

            const curUpgradeData = upgradeDatas[upgradeKey];

            if(UpgradeUtil.isMaxUpgrade(userUpgrades[upgradeLevelKey], curUpgradeData["max-level"])) {
                throw new ConflictException("이미 최대 레벨입니다.");
            }

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
            const upgradeStats = await db.stats.update({
                where: {
                    userId: userId
                },
                data: {
                    gold: {
                        increment: -curPrice
                    },
                    [upgradeKey]: curUpgradeData['default-value'] + nextValue
                }
            });

            const info:UpgradeInfoContainer = {
                upgradeInfo: UpgradeUtil.getNextUpgradeInfo(
                    userUpgrades[upgradeLevelKey],
                    userStats.gold - curPrice,
                    upgradeKey,
                    curUpgradeData
                ),
                curGold: userStats.gold - curPrice,
                curStats: upgradeStats[upgradeKey]
            }

            return info;
        });
    }

    async getGuestInfos(guestUpgradeData:GuestUpgradeDataDTO):Promise<UpgradeInfo[]> {
        const infos:UpgradeInfo[] = [];

        for(const key of upgradeDataKeys) {
            const upgradeLevelType = `${key}Level` as UpgradeLevelKey;

            const curUpgradeData = upgradeDatas[key];

            infos.push(UpgradeUtil.getCurUpgradeInfo(
                guestUpgradeData[upgradeLevelType],
                guestUpgradeData.gold,
                key,
                curUpgradeData
            ));
        }

        return infos;
    }

    async buyGuestUpgrade(guestUpgradeData:GuestBuyUpgradeDTO):Promise<UpgradeInfoContainer> {
        const upgradeKey:UpgradeKey = guestUpgradeData.upgradeKey;

        const curUpgradeData = upgradeDatas[upgradeKey];

        if(UpgradeUtil.isMaxUpgrade(guestUpgradeData.level, curUpgradeData["max-level"])) {
            throw new ConflictException("이미 최대 레벨입니다.");
        }

        const curPrice = UpgradeUtil.calcPrice(
            guestUpgradeData.level,
            curUpgradeData['base-price'],
            curUpgradeData['mult-price']
        );

        if(curPrice > guestUpgradeData.gold) {
            throw new ConflictException("구매하려는 업그레이드의 가격이 현재 소지 중인 골드보다 높습니다.");
        }

        const nextValue = UpgradeUtil.calcValue(
            guestUpgradeData.level + 1,
            curUpgradeData['base-value'],
            curUpgradeData['mult-value'],
            curUpgradeData['type-value']
        );

        const info:UpgradeInfoContainer = {
            upgradeInfo: UpgradeUtil.getNextUpgradeInfo(
                guestUpgradeData.level,
                guestUpgradeData.gold - curPrice,
                upgradeKey,
                curUpgradeData
            ),
            curGold: guestUpgradeData.gold - curPrice,
            curStats: curUpgradeData['default-value'] + nextValue
        }

        return info;
    }
}
