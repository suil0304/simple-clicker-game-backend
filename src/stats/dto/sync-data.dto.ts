import { IsArray, IsInt, Min, ValidateNested } from 'class-validator';
import { ClickDataDTO } from './click-data.dto';
import { Type } from 'class-transformer';

export class SyncDataDTO {
    @IsInt()
    readonly totalClickAddGold!:number;

    @IsArray()
    @ValidateNested({
        each: true
    })
    @Type(() => ClickDataDTO)
    readonly clickDatas!:ClickDataDTO[];

    @IsInt()
    @Min(0)
    readonly deltaSecondCount!: number;
}
