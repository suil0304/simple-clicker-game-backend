import { IsInt, Min } from "class-validator";
import { UpgradeDTO } from "./upgrade.dto";

export class GuestBuyUpgradeDTO extends UpgradeDTO {
    @IsInt()
    readonly gold!:number;

    @IsInt()
    @Min(0)
    readonly level!:number;
}