import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
constructor(private usersService:UsersService){}

 async login(loginDTO:LoginDTO){
  const user = await this.usersService.findOne(loginDTO)
    if (!user) {
    throw new UnauthorizedException('User not found');
    }
  const passwordMatch = await bcrypt.compare(loginDTO.password ,user.password)
  if(!passwordMatch){
    throw new UnauthorizedException('password does not match')
  }
  return user;
 }
 
}
