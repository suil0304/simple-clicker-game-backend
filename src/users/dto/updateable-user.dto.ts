import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateableUserDTO {
  @IsOptional()
  @IsString()
  readonly nickname?:string | null;
}
