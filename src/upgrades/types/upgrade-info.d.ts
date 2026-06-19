import { UpgradeKey } from "./upgrade-key";

export interface UpgradeInfo {
    readonly upgradeKey:UpgradeKey;
    readonly level:number;
    readonly curPrice:number;
    readonly curValue:number;
    readonly nextValue:number;
    readonly canBuy:boolean;
}