import { SettingDataContents } from "./setting-data-contents";
import { SettingKey } from "./setting-key";
import { SettingValueType } from "./setting-value-type";

export interface SettingInfo extends SettingDataContents {
    readonly settingKey:SettingKey;

    readonly curValue:SettingValueType;
}