import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist-entity";

@Entity('users')
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

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable:true, type:'text'})
  @Exclude()
  towFASecret:string 

  @Column({ default:false, type: 'boolean' })
  enable2FA:boolean

  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];

}