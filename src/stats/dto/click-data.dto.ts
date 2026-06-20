import { IsBoolean } from "class-validator";

export class ClickDataDTO {
    @IsBoolean()
    readonly isCritical!:boolean;
}