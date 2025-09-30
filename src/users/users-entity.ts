import { Exclude } from "class-transformer";
import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Users')
export class User{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  firstName:string

  @Column()
  lastName:string  

  @Column({ unique:true })
  email:string

  @Column()
  @Exclude()
  password:string

  @Column({ nullable:true, type:'text'})
  towFASecret:string 

  @Column({ default:false, type: 'boolean' })
  enable2FA:boolean
}