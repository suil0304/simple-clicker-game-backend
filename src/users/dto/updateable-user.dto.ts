import {
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateableUserDTO {
  @ValidateIf((_, v) => {
    return v !== null; // false를 반환하는 경우 검증 건너뛰기라고 하네요
  })
  @IsString()
  readonly nickname?: string;
}
