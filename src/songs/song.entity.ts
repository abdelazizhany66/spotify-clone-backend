import { Artist } from "src/artists/artist-entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('song')
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
}