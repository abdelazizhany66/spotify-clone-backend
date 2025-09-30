import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../artists/artist-entity";
import { Playlist } from "../playlist/playlist-entity";

@Entity('songs')
export class Song {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  // @Column('varchar',{array:true})
  // artists:string[];

  @Column('date')
  releasedDate:Date;

  @Column('time')
  duration:Date;

  @Column('text')
  lyrics:string;

  @ManyToMany(()=> Artist, (artist)=> artist.songs,{ cascade:true })
  @JoinTable({name:'songes-artists'})
  artists: Artist[]

  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}