import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from '../artists/artists.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports:[
    UsersModule,
    ArtistsModule,
    RedisModule,
    JwtModule
    .register({
			secret: process.env.JWT_SECRET,
        signOptions:{
        expiresIn:process.env.ACCESSTOKEN_LIFETIME
        },

  }),
   
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports:[AuthService],
})
export class AuthModule {}
  