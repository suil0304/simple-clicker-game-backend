import { JwtContainer } from "../../types/jwt-container";

export class JwtUtil {
    public static getJwtContainer(token:string):JwtContainer {
        return {
            token: token
        }
    }
}