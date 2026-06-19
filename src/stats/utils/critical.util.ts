export class CriticalUtil {
    public static calcCriticalGold(addGold:number, criticalMult:number, criticalRate:number):number {
        return this.isCritical(criticalRate) ? Math.floor(addGold * criticalMult) : addGold;
    }

    public static isCritical(criticalRate:number):boolean {
        const random = Math.random() * 100;
        return random >= (100 - criticalRate);
    }
}