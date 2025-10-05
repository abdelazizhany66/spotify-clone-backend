import { Song } from '../songs/song-entity';
import { User } from '../users/users-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @ManyToMany(() => Song, (song) => song.playlists, { 
    eager: true, 
    cascade: true 
  })
  @JoinTable({
    name: 'playlist_songs', 
    joinColumn: { name: 'playlist_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'song_id', referencedColumnName: 'id' }
  })
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}