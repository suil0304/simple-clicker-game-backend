import { UpgradeData } from "../types/upgrade-data";
import { UpgradeKey } from "../types/upgrade-key";
import rawJson from "./upgrade-data.json";

export const upgradeDatas = rawJson satisfies UpgradeData<typeof rawJson>;
export const upgradeDataKeys = Object.keys(upgradeDatas) as UpgradeKey[];
