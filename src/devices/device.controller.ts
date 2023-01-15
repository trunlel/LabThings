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
import { DeviceEntity } from './entities/device.entity';

@Controller('devices')
export class DevicesController {
  constructor(private readonly DevicesService: DevicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/link/:id')
  async linkDevice(@Body() body, @Request() request, @Param('id') id: string) {
    try {
      return await this.DevicesService.linkDeviceInUser(
        request.user,
        body,
        +id,
      );
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserDevices(@Request() request): Promise<UserDeviceEntity[]> {
    try {
      return await this.DevicesService.findAllDevices(request.user);
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async findDevice(@Param('id') id: number): Promise<DeviceEntity> {
    try {
      return await this.DevicesService.findOneDevice(id);
    } catch (err) {
      throw new HttpException({ reason: err?.detail }, HttpStatus.NOT_FOUND);
    }
  }
}
