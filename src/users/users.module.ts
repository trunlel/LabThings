import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './users.controller';
import { userProvider } from './user.providers';
import { databaseProviders } from 'src/core/database/database.providers';
import { JwtStrategy } from 'src/core/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    ...userProvider,
    ...databaseProviders,
    JwtStrategy,
    JwtService,
  ],
})
export class UsersModule {}
