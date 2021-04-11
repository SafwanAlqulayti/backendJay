import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config';
import { env } from 'node:process';
// const dbConfig = config.get('db');
<<<<<<< HEAD



export const typeOrm :TypeOrmModuleOptions={



  type: 'postgres',
  port: 5432,
  database: 'food',
  host: 'localhost',
  username: 'postgres',
  password: '123456',
=======
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  database: 'jay',
  host: process.env.DB_HOST,
  username:  'postgres',
  password: 'postgres',
>>>>>>> 1dcf2efe70c1463c2dd4d06707bb3b79caf47836
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: '../../src/migrations'
  },
}
