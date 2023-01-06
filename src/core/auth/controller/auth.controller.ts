import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { authDto } from 'src/users/dto/login-user.dto';

@Controller('users')
export class authController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() credentialsDto: authDto) {
    return await this.authService.signIn(credentialsDto);
  }
}
