import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { authDto } from 'src/users/dto/login-user.dto';

@Controller('users')
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() credentialsDto: authDto) {
    return await this.authService.signIn(credentialsDto);
  }

  @Get('me')
  async me(@Headers('authorization') authToken) {
    const token = authToken.split('Bearer ')[1];
    return await this.authService.validateToken(token);
  }
}
