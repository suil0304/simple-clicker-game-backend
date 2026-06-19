import { IsIn } from "class-validator";
import { upgradeDataKeys } from "../data/upgrade.data";
import type { UpgradeKey } from "../types/upgrade-key";

export class UpgradeDTO {
    @IsIn(upgradeDataKeys)
    readonly upgradeKey!:UpgradeKey;
}