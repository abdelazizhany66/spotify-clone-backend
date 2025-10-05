

import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import { User } from "src/users/users-entity";
import { Song } from "src/songs/song-entity";
import { Artist } from "src/artists/artist-entity";
import { Playlist } from "src/playlist/playlist-entity";

dotenv.config(); 

export const AppDataSource =new DataSource ({
  type: 'postgres', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.POSTGRES_USER,
  // database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
entities: [ User,Song,Artist,Playlist], // __dirname + '/**/*.entity{.ts,.js}'     User,Song,Artist,Playlist
synchronize: true,
migrationsRun: true, // علشان تشغل الميجراشنز أوتوماتيك
migrations: ['dist/migration/migrations/*{.ts,.js}'],
})

AppDataSource.initialize()
             .then(() => {
	             console.log('Data Source has been initialized!')
             })
             .catch((err) => {
	             console.error('Error during Data Source initialization', err);
             })
