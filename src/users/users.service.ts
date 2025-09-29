import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { LoginDTO } from 'src/auth/dto/login-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async create(userDto:CreateUserDTO){
    const salt = await bcrypt.genSalt()
    userDto.password = await bcrypt.hash(userDto.password,salt)
    const user = await this.userRepo.save(userDto)
    return user
  }
  findOne(data:LoginDTO){
    const user =  this.userRepo.findOneBy({email:data.email}) //{where:{email:data.email}}
    if(!user){
      throw new UnauthorizedException('Cloud not find user')
    }
    return user;
  }
}
