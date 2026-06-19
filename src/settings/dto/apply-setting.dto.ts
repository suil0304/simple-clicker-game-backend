import { IsIn, Validate } from "class-validator";
import { settingDataKeys, settingTypes } from "../data/setting.data";
import type { SettingKey } from "../types/setting-key";
import { isSettingValueType } from "../validate/is-setting-value-type.validate";
import type { SettingValueType } from "../types/setting-value-type";
import type { SettingType } from "../types/setting-type";

export class ApplySettingDTO {
    @IsIn(settingDataKeys)
    readonly settingKey!:SettingKey;

    @IsIn(settingTypes)
    readonly settingTypes!:SettingType;

    @Validate(isSettingValueType, {
        message: "applyValue는 string | number | boolean 타입이어야 합니다."
    })
    readonly applyValue!:SettingValueType;
}