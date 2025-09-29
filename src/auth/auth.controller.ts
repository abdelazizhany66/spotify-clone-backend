import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';

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
}
