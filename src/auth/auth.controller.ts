import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterOrLoginDTO } from './dto/register-or-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post("register")
    async register(@Body() registerData:RegisterOrLoginDTO) {
        return this.authService.register(registerData);
    }

    @Post("login")
    async login(@Body() loginData:RegisterOrLoginDTO) {
        return this.authService.login(loginData);
    }
}
