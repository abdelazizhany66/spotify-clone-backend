import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
type: 'postgres', 
host:'localhost',
port:5432,
username:'postgres',
password:'1102000',
database:'spotify-clone',
entities:['dist/**/*-entity.js'],
synchronize:false,
migrations:['dist/migration/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;