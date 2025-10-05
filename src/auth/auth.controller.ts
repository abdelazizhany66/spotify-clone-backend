import { Body, Controller, Delete, Get, Post, Req, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-guard';
import { ValidateTokenDTO } from './dto/validate-token-dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from 'src/users/users-entity';
import { ResponseUtil } from 'src/common/utils/response.util';
import { serialize } from '../interseptors/serialize.interceptor';
import { UserDto } from './dto/user-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private AuthService : AuthService,
  ){}

  @Post('/signup')
  @ApiOperation({ summary: 'Register new user'})
  @ApiResponse({
    status: 201,
    description: 'it will return the user in the response'
  })
  @serialize(UserDto)
  async signup(@Body() createUserDTO:CreateUserDTO){
    const newUser = await this.AuthService.signup(createUserDTO)
    return ResponseUtil.success(newUser,'User registered successfully')
  }


  @Post('/login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
 async login(@Body() loginDTO: LoginDTO){
    const user = await this.AuthService.login(loginDTO)
    return ResponseUtil.success(user,'Login successful')
  }
  
  
  // auth.controller.ts
@Post('/refreshToken')
@ApiOperation({ summary: 'refresh accesstoken when expirin' })
@ApiResponse({
  status: 200,
  description: 'It will renew accesstoken',
})
async refreshToken(@Body() body: RefreshTokenDto) {

  const refreshToken = body.refreshToken;
  
  if (!refreshToken) {
    throw new UnauthorizedException('Refresh token is required');
  }
    const tokens = await this.AuthService.refreshToken(refreshToken);
    return ResponseUtil.success(tokens, 'Token refreshed successfully');

}

  

  @Get('enable-2fa')
  @ApiOperation({ summary: 'field in user if skip 2fa will be true' })
  @ApiResponse({
    status: 200,
    description: 'It will {enable2fa:true} in the response',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async enable2FA(@Request() req){
    const enable2fa = await this.AuthService.enable2FA(req.user.userId)
    return ResponseUtil.success(enable2fa, 'Disable is success to Two Factor Authentication ');

  }

  @Post('validate-2fa')
  @ApiOperation({ summary: 'when take towFASecret and put in google authentcation ' })
  @ApiResponse({
    status: 200,
    description: 'the login steps is finished you can doing anything in your account',
  })
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async validate2FA(@Request() req, @Body() ValidateTokenDTO:ValidateTokenDTO){
    const validateToken = await this.AuthService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token
    )

    return ResponseUtil.success(validateToken, 'Validate  is success');

  }


 @Post('logout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
async logout(@CurrentUser() user: User){
  await this.AuthService.signout(user.id);
  return ResponseUtil.success('signout success', 'Logout successful');
}

}
