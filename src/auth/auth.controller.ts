import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private UsersService:UsersService){}

  @Post('/signup')
  signup(@Body() createUserDTO:CreateUserDTO){
    return this.UsersService.create(createUserDTO)
  }
}
