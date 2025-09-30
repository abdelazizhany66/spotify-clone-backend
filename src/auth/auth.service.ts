import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as speeakeasy from 'speakeasy'
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { PayLoadType } from './types';
import { ArtistsService } from '../artists/artists.service';

@Injectable()
export class AuthService {
constructor(
  private usersService:UsersService,
  private JwtService : JwtService,
  private ArtistsService : ArtistsService
){}

 async login(loginDTO:LoginDTO){
  const user = await this.usersService.findOne(loginDTO)
    if (!user) {
    throw new UnauthorizedException('User not found');
    }
  const passwordMatch = await bcrypt.compare(loginDTO.password ,user.password)
    if(!passwordMatch){
      throw new UnauthorizedException('password does not match')
    }
  
  const payload:PayLoadType = {email:user.email,userId:user.id}
  const artist = await this.ArtistsService.findArtist(user.id)
  if(artist){
    payload.artistId = artist.id
  }

  if(user.towFASecret && user.enable2FA){
    return {
      validate2FA:'http://localhost:3000/auth/validate-2fa',
      message: 'Please send the one time password or token from you Google Authenticator App'
    }
  }

  const accessToken = this.JwtService.sign(payload)
  return {
    accessToken
    };
 }

 async enable2FA(userId:number){
  const user = await this.usersService.findById(userId);
  if(!user){
    throw new NotFoundException('not found this id')
  }
  if(user.towFASecret){
    return { secret:user.towFASecret }
  }
  const secret = speeakeasy.generateSecret()
  user.towFASecret = secret.base32
  await this.usersService.updateSecretKey(user.id, user.towFASecret)
  return { secret : user.towFASecret }
 }
 
 async validate2FAToken(
  userId:number,
  token:string
 ){
    const user = await this.usersService.findById(userId)
    if(!user){
      throw new NotFoundException()
    }
    const verified = speeakeasy.totp.verify({
      secret: user.towFASecret,
      token: token,
      encoding: 'base32',
      window: 1
    })
    console.log("Secret in DB:", user.towFASecret);
    if(verified){
      return { verified: true }
    }else{
      return { verified: false }
    }
  }

  async disable2FA(userId:number){
    return this.usersService.disable2FA(userId)
  }

}
