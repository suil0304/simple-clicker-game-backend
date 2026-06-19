import { SettingData } from "../types/setting-data";
import { SettingKey } from "../types/setting-key";
import rawJson from "./setting-data.json";

export const settingData = rawJson satisfies SettingData<typeof rawJson>;
export const settingDataKeys = Object.keys(rawJson) as SettingKey[];
export const settingTypes = ["string", "int", "float", "percent", "boolean"] as const;