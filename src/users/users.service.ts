import { Body, Injectable } from '@nestjs/common';
import { User } from './users-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async create(userDto:CreateUserDTO){
    const salt = await bcrypt.genSalt()
    userDto.password = await bcrypt.hash(userDto.password,salt)
    const user = await this.userRepo.save(userDto)
    return user
  }
}
