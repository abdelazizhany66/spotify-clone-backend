

import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv';
import { User } from "src/users/users-entity";
import { Song } from "src/songs/song-entity";
import { Artist } from "src/artists/artist-entity";
import { Playlist } from "src/playlist/playlist-entity";

dotenv.config(); // 👈 يحمّل .env

export const AppDataSource =new DataSource ({
  type: 'postgres', 
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
entities: [User,Song,Artist,Playlist], //__dirname + '/**/*.entity.js' User,Song,Artist,Playlist
migrations: ['dist/migration/migrations/*{.ts,.js}'],
synchronize: false,
})

// const dataSource = new DataSource(dataSourceOptions);
// export default dataSource;
AppDataSource.initialize()
             .then(() => {
	             console.log('Data Source has been initialized!')
             })
             .catch((err) => {
	             console.error('Error during Data Source initialization', err);
             })










// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
// import { DataSource, DataSourceOptions } from "typeorm";

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (
//     configService: ConfigService,
//   ) => {
//     return {
//       type: 'postgres',
//       host: configService.get<string>('DB_HOST'),
//       port: configService.get<number>('DB_PORT'),
//       username: configService.get<string>('DB_USERNAME'),
//       database: configService.get<string>('DB_NAME'),
//       password: configService.get<string>('DB_PASSWORD'),
//       entities: ['dist/**/*-entity.js'],
//       synchronize: false,
//       migrations: ['dist/migration/migrations/*.js'],
//     };
//   },
// };

// export const dataSourceOptions: DataSourceOptions = {
// type: 'postgres', 
// host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT!),
//   username: process.env.DB_USERNAME,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
// entities:['dist/**/*-entity.js'],
// synchronize:false,
// migrations:['dist/migration/migrations/*.js']
// }

// const dataSource = new DataSource(dataSourceOptions)
// export default dataSource;