import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { authConstants } from './auth-constants';
import { JwtStrategy } from './jwt-strategy';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports:[UsersModule,JwtModule.register({secret:authConstants.secret, signOptions:{expiresIn:'1d'}}),
    ArtistsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports:[AuthService],
})
export class AuthModule {}
