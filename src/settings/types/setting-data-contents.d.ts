import { SettingOption } from "./setting-option";
import { SettingType } from "./setting-type";

export interface SettingDataContents {
    readonly "name":string;
    readonly "description":string;

    readonly "type":SettingType;

    // string type only
    readonly "options":SettingOption | null;

    // int / float / percent type only
    readonly "minValue":number | null;
    readonly "maxValue":number | null;
    readonly "step":number | null;
}