import { IsString, Matches } from "class-validator";

export class RegisterOrLoginDTO {
    @IsString()
    @Matches(/^[a-z0-9]{2,10}$/, {
        message: "이름은 최소 2자리, 최대 10자리, 영어 소문자와 숫자가 허용됩니다."
    })
    readonly name!: string;

    @IsString()
    @Matches(/^[a-zA-Z0-9_!@#$%^&*(){}=~`\[\]\-]{8,22}$/, {
        message: "비밀번호는 최소 8자리, 최대 22자리, 영어 대소문자와 숫자, 특수문자가 허용됩니다."
    })
    readonly password!: string;
}