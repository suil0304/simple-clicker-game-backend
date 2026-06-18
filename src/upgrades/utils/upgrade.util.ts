import { upgradeData } from "../data/upgrade.data";
import { UpgradeInfo } from "../types/upgrade-info";
import { UpgradeKey } from "../types/upgrade-key";
import { ValueType } from "../types/value-type";

export class UpgradeUtil {
    /**
     * level은 0부터 시작합니다.(indexing)
     */
    public static calcPrice(level:number, bases:number[], mult:number):number {
        if(level < 0) {
            console.error("레벨이 0 미만으로 들어옴");
            return 0;
        }

        const lastIndex = bases.length - 1;
        if(level <= lastIndex) {
            return Math.floor(bases[level]);
        }

        const last = bases[lastIndex];
        return Math.floor(last * (mult ** (level - lastIndex)));
    }

    /**
     * level은 0부터 시작합니다.(indexing)
     */
    public static calcValue(level:number, bases:number[], mult:number, type:ValueType = "multiply"):number {
        if(level <= 0) {
            return 0;
        }

        const index = level - 1;
        const lastIndex = bases.length - 1;

        switch(type) {
            case "stack":
                const start = bases[0];
                return start + (start * mult) * index;
            case "multiply":
                if(index <= lastIndex) {
                    return bases[index];
                }

                const last = bases[lastIndex];
                return last * (mult ** (index - lastIndex));
            default:
                return 0;
        }
    }

    public static getCurUpgradeInfo(curLevel:number, curGold:number, upgradeType:UpgradeKey, curUpgradeData:typeof upgradeData[typeof upgradeType]):UpgradeInfo {
        const curPrice = UpgradeUtil.calcPrice(
            curLevel,
            curUpgradeData['base-price'],
            curUpgradeData['mult-price']
        );
        const curValue = UpgradeUtil.calcValue(
            curLevel,
            curUpgradeData['base-value'],
            curUpgradeData['mult-value'],
            curUpgradeData['type-value']
        );
        const nextValue = UpgradeUtil.calcValue(
            curLevel + 1,
            curUpgradeData['base-value'],
            curUpgradeData['mult-value'],
            curUpgradeData['type-value']
        );

        const upgradeInfo:UpgradeInfo = {
            upgradeType: upgradeType,
            level: curLevel,
            curPrice: curPrice,
            curValue: curValue,
            nextValue: nextValue,
            canBuy: curGold >= curPrice
        };

        return upgradeInfo;
    }

    public static getNextUpgradeInfo(curLevel:number, curGold:number, upgradeType:UpgradeKey, curUpgradeData:typeof upgradeData[typeof upgradeType]):UpgradeInfo {
        return this.getCurUpgradeInfo(curLevel + 1, curGold, upgradeType, curUpgradeData);
    }
}