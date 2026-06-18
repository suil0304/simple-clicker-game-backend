import { createParamDecorator } from "@nestjs/common";
import { UserPayload } from "../types/user-payload";

export const GetUser = createParamDecorator((key:keyof UserPayload | undefined, context) => {
    const req = context.switchToHttp().getRequest();
    const user:UserPayload = req.user;

    return key ? user[key] : user;
});