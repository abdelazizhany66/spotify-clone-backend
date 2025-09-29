import { Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "../songs/song.entity";
import { User } from "../users/users-entity";

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id:number

  @OneToOne(()=> User)
  @JoinColumn()
  user:User

  @ManyToMany(()=> Song,(song)=> song.artists)
  songs:Song[]
}