import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as speeakeasy from 'speakeasy'
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';
import { PayLoadType } from './types';
import { ArtistsService } from '../artists/artists.service';
import { RedisService } from '../redis/redis.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
constructor(
  private usersService:UsersService,
  private JwtService : JwtService,
  private ArtistsService : ArtistsService,
  private readonly redisService: RedisService
){}

  async generateTokens(email:string, userId: number) {
		const payload = { email, userId };
		const accessToken = this.JwtService.sign(payload, {
			expiresIn: process.env.ACCESSTOKEN_LIFETIME,
			secret: process.env.JWT_SECRET,
		});

		const refreshToken = this.JwtService.sign(payload, {
			expiresIn: process.env.REFRESHTOKEN_LIFETIME,
			secret: process.env.REFRESH_TOKEN_SECRET,
		});

		return {
			accessToken,
			refreshToken,
		};
	}

 async signup(createUserDTO:CreateUserDTO){
  const {email, password} = createUserDTO
   const dupUser = await this.usersService.findOne(email)
  if(dupUser){
    throw new BadRequestException('user already exist please log in')
  }
     
  
  createUserDTO.password = await bcrypt.hash(password,10)
   
  const user = await this.usersService.create(createUserDTO)

  const { accessToken, refreshToken } = await this.generateTokens(user.email, user.id)
  await this.redisService.setRefreshToken(user.id, refreshToken)

  return {
    user,
    accessToken,
    refreshToken
  }
 
 }

 async login(loginDTO:LoginDTO){
  const {email, password} = loginDTO
  const user = await this.usersService.findOne(email)
    if (!user) {
    throw new UnauthorizedException('User not found');
    }
  const passwordMatch = await bcrypt.compare(password ,user.password)
    if(!passwordMatch){
      throw new UnauthorizedException('password does not match')
    }
  
  const payload:PayLoadType = {email:user.email,userId:user.id}
  const artist = await this.ArtistsService.findArtist(user.id)
  if(artist){
    payload.artistId = artist.id
  }

  const {accessToken, refreshToken} = await this.generateTokens(user.email,user.id)
  await this.redisService.setRefreshToken(user.id,refreshToken)

    if(user.towFASecret && user.enable2FA){
    return {
      validate2FA:'http://localhost:3000/auth/validate-2fa',
      message: 'Please send the one time password or token from you Google Authenticator App',
       accessToken,
      refreshToken
    }
  }

  return {
    accessToken,
    refreshToken
    };
 }
// valid refresh token sent from front is exist to redis or not and renew access token if expire
 async refreshToken(refreshToken:string){
  const payload = this.JwtService.verify(refreshToken,{
    secret: process.env.REFRESH_TOKEN_SECRET
  })
  const sortToken = await this.redisService.getRefreshToken(payload.userId)

  if(sortToken !== refreshToken){
    throw new UnauthorizedException('invalid refresh token')
  }

  const { accessToken } = await this.generateTokens(payload.email,payload.userId)

  return { accessToken }
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

    if(verified){
      return { verified: true }
    }else{
      return { verified: false }
    }
  }


  async signout(userId: number) {
		console.log(userId);
		await this.redisService.deleteRefreshToken(userId);
		return 'signout success';
	}

}
