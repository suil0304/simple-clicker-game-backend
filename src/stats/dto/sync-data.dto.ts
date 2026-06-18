import { IsInt, Min } from 'class-validator';

export class SyncDataDTO {
  @IsInt()
  @Min(0)
  readonly deltaClickCount!: number;

  @IsInt()
  @Min(0)
  readonly deltaSecondCount!: number;
}
