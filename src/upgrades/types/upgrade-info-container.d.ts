import { UpgradeInfo } from "./upgrade-info";

export interface UpgradeInfoContainer {
    readonly upgradeInfo:UpgradeInfo;
    readonly curGold:number;
    readonly curStats:number;
}