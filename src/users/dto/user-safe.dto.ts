import { IsDate, IsInt, IsString } from "class-validator";
import { UpdateableUserDTO } from "./updateable-user.dto";

export class UserSafeDTO extends UpdateableUserDTO {
    @IsInt()
    readonly id!:number;

    @IsString()
    readonly name!:string;

    @IsDate()
    readonly createdAt!:Date;

    @IsDate()
    readonly updatedAt!:Date;
}