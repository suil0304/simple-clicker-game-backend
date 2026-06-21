import { UpgradeInfo } from "./upgrade-info";

export interface UpgradeInfoWithGold {
    readonly upgradeInfo:UpgradeInfo;
    readonly curGold:number;
}