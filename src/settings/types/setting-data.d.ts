import { SettingDataContents } from "./setting-data-contents";

export type SettingData<V extends object> = Record<keyof V, SettingDataContents>;