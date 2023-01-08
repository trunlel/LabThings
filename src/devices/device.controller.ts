import {
  Controller,
  Post,
  Body,
  Param,
  Request,
  UseGuards,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { DevicesService } from './services/devices.service';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { UserDeviceEntity } from './entities/user-device.entity';
import { HttpException } from '@nestjs/common/exceptions';

@Controller('devices')
export class DevicesController {
  constructor(private readonly DevicesService: DevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/link/:id')
  async followUser(@Body() body, @Request() request, @Param('id') id: string) {
    return await this.DevicesService.linkeDeviceInUser(request.user, body, +id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() request): Promise<UserDeviceEntity[]> {
    try {
      return await this.DevicesService.findAll(request.user);
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST);
    }
  }
}
