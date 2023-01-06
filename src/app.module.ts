import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { AuthService } from './core/auth/auth.service';
import { databaseProviders } from './core/database/database.providers';
import { JwtStrategy } from './core/auth/jwt.strategy';
import { userProvider } from './users/user.providers';
import { authController } from './core/auth/controller/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60,
      },
    }),

    UsersModule,
  ],
  controllers: [authController],
  providers: [...databaseProviders, ...userProvider, AuthService, JwtStrategy],
})
export class AppModule {}
