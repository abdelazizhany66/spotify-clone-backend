import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from '../artists/artists.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule,JwtModule
    .registerAsync({
      imports:[ConfigModule],
      useFactory:async (configService:ConfigService)=>({
        secret: configService.get<string>('secret'),
        signOptions:{
        expiresIn:'1d'
        },
      }),
    inject:[ConfigService]
  }),
    ArtistsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}
