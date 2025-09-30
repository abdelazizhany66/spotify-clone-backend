import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { ValidateTokenDTO } from './dto/validate-token-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private AuthService : AuthService,
    private UsersService:UsersService
  ){}

  @Post('/signup')
  signup(@Body() createUserDTO:CreateUserDTO){
    return this.UsersService.create(createUserDTO)
  }

  @Post('/login')
  login(@Body() loginDTO: LoginDTO){
    return this.AuthService.login(loginDTO)
  }

  @Get('enable-2fa')
  @UseGuards(JwtAuthGuard)
  enable2FA(@Request() req){
    return this.AuthService.enable2FA(req.user.userId)
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  validate2FA(@Request() req, @Body() ValidateTokenDTO:ValidateTokenDTO){
    return this.AuthService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token
    )
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGuard)
  disable2FA(@Request() req){
    return this.AuthService.disable2FA(req.user.userId)
  }

}
