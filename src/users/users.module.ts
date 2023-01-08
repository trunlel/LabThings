import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { userProvider } from './user.providers';
import { databaseProviders } from 'src/core/database/database.providers';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...userProvider, ...databaseProviders],
})
export class UsersModule {}
