import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './users-entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async create(userDto:CreateUserDTO){
    const user = this.userRepo.create(userDto)
    return await this.userRepo.save(user)
  }

  
  findOne(email:string){
    const user =  this.userRepo.findOneBy({email}) //{where:{email:data.email}}
    if(!user){
      throw new UnauthorizedException('Cloud not find user')
    }
    return user;
  }

  async findById(id:number){
    return await this.userRepo.findOneBy({id})
  }

  async updateSecretKey(userId:number,secret:string){
    return await this.userRepo.update({id:userId},{
      towFASecret:secret,
      enable2FA:true
    })
  }


}
