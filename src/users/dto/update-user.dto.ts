import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  readonly nickname?:string | null;
}
