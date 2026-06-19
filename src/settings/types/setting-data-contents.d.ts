import { SettingOption } from "./setting-option";
import { SettingType } from "./setting-type";

export interface SettingDataContents {
    "name":string;
    "description":string;

    "type":SettingType;

    // string type only
    "options":SettingOption | null;

    // int / float / percent type only
    "minValue":number | null;
    "maxValue":number | null;
    "step":number | null;
}