import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './service/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { AddressDTO } from './dto/address-user.dto';
import { AuthService } from 'src/core/auth/auth.service';
import { authDto } from './dto/login-user.dto';
import { changePasswordDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createdUser: CreateUserDto) {
    return await this.usersService.createUser(createdUser);
  }

  @Get()
  async findAll(): Promise<UserEntity[]> {
    try {
      return await this.usersService.findAll();
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: changePasswordDto) {
    console.log(id);
    return await this.usersService.changePassword(id, body);
  }
}
