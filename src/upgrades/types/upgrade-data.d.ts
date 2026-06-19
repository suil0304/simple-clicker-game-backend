import { ValueType } from "./value-type";

export type UpgradeData<V extends object> = Record<keyof V, UpgradeDataContents>;