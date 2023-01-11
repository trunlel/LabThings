import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { changePasswordDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createdUser: CreateUserDto) {
    try {
      return await this.usersService.createUser(createdUser);
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.CONFLICT);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUser(@Request() request): Promise<UserEntity> {
    try {
      return await this.usersService.findUser(request.user);
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  async updatePassword(@Request() request, @Body() body: changePasswordDto) {
    try {
      return await this.usersService.changePassword(request.user, body);
    } catch (err) {
      throw new HttpException(
        'Verifique seu email e senha!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
