import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './types/auth.types';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): LoginResponse {
    return this.authService.login(loginDto);
  }
}
