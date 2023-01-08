import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { DevicesController } from './device.controller';
import { UsersService } from 'src/users/service/users.service';
import { DevicesService } from './services/devices.service';
import { deviceProvider } from './device.providers';

@Module({
  controllers: [DevicesController],
  providers: [
    UsersService,
    ...deviceProvider,
    ...databaseProviders,
    DevicesService,
  ],
})
export class DevicesModule {}
