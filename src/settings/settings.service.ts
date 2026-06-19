import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { settingData, settingDataKeys } from './data/setting.data';
import { SettingInfo } from './types/setting-info';
import { SettingKey } from './types/setting-key';
import { SettingUtil } from './utils/setting.util';
import { ApplySettingDTO } from './dto/apply-setting.dto';

@Injectable()
export class SettingsService {
    constructor(private readonly prisma:PrismaService) {}

    async getSettings(userId:number):Promise<SettingInfo[]> {
        const settings = await this.prisma.setting.findUniqueOrThrow({
            where: {
                userId: userId
            }
        });
        const settingInfos:SettingInfo[] = [];

        for(const key of settingDataKeys) {
            const curSettingData = settingData[key];
            settingInfos.push(SettingUtil.getSettingInfo(key, settings[key], curSettingData));
        }

        return settingInfos;
    }

    async getSetting(userId:number, settingKey:SettingKey):Promise<SettingInfo> {
        const settings = await this.prisma.setting.findUniqueOrThrow({
            where: {
                userId: userId
            }
        });
        const curSettingData = settingData[settingKey];

        return SettingUtil.getSettingInfo(settingKey, settings[settingKey], curSettingData);
    }

    async applySetting(userId:number, applySettingData:ApplySettingDTO):Promise<SettingInfo> {
        return this.prisma.$transaction(async (db) => {
            const settings = await db.setting.findUniqueOrThrow({
                where: {
                    userId: userId
                }
            });

            const curApplyValueType = typeof applySettingData.applyValue;
            const curSettingValueType = typeof settings[applySettingData.settingKey];
            if(curApplyValueType !== curSettingValueType) {
                throw new BadRequestException(`${applySettingData.settingKey}의 applyValue는 ${curSettingValueType} 타입이어야 합니다.`);
            }

            await db.setting.update({
                where: {
                    userId: userId
                },
                data: {
                    [applySettingData.settingKey]: applySettingData.applyValue as any
                }
            });

            const curSettingData = settingData[applySettingData.settingKey];

            return SettingUtil.getSettingInfo(applySettingData.settingKey, applySettingData.applyValue, curSettingData);
        });
    }
}
