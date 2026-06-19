import { settingData } from "../data/setting.data";
import { SettingInfo } from "../types/setting-info";
import { SettingKey } from "../types/setting-key";
import { SettingValueType } from "../types/setting-value-type";

export class SettingUtil {
    public static getSettingInfo(settingKey:SettingKey, curValue:SettingValueType, curSettingData:(typeof settingData)[SettingKey]):SettingInfo {
        return {
            settingKey: settingKey,
            name: curSettingData.name,
            description: curSettingData.description,
            type: curSettingData.type,
            options: curSettingData.options,
            curValue: curValue,
            minValue: curSettingData.minValue,
            maxValue: curSettingData.maxValue,
            step: curSettingData.step
        };
    }
}