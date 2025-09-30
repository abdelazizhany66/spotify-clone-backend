import { Exclude } from "class-transformer";
<<<<<<< HEAD
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist-entity";
=======
import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> 8b5295877762631aee4b6f23b4635364195ef67f

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

  @Column({ nullable:true, type:'text'})
  towFASecret:string 

  @Column({ default:false, type: 'boolean' })
  enable2FA:boolean
<<<<<<< HEAD

   @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];

=======
>>>>>>> 8b5295877762631aee4b6f23b4635364195ef67f
}