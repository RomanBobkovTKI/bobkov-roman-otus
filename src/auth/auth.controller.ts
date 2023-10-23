import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto) {
    return this.authService.login(loginDto);
  }
}
