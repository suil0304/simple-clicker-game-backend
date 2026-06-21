import { IsInt, Min } from "class-validator";

export class GuestUpgradeDataDTO {
    @IsInt()
    @Min(0)
    readonly goldPerClickLevel!:number;

    @IsInt()
    @Min(0)
    readonly goldPerSecondLevel!:number;

    @IsInt()
    @Min(0)
    readonly criticalMultLevel!:number;
    
    @IsInt()
    @Min(0)
    readonly criticalRateLevel!:number;

    @IsInt()
    @Min(0)
    readonly gold!:number;
}