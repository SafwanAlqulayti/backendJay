// import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import * as config from 'config';
// import { env } from 'node:process';
// // const dbConfig = config.get('db');
// export const typeOrm: TypeOrmModuleOptions = {
//   type: 'postgres',
//   port: Number(process.env.DB_PORT),
//   database: 'Jay',
//   host: process.env.DB_HOST,
//   username:  'postgres',
//   password: 'Mm121212',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
//   migrations: ['../../src/migrations/*{.ts,.js}'],
//   logging:true,
//   cli: {
//     migrationsDir: '../../src/migrations'
//   },
// }

// import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import * as config from 'config';
// import { env } from 'node:process';
// // const dbConfig = config.get('db');
// export const typeOrm: TypeOrmModuleOptions = {
//   type: 'postgres',
//   port: Number(process.env.DB_PORT),
//   database: 'Jay',
//   host: process.env.DB_HOST,
//   username:  'postgres',
//   password: 'Mm121212',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
//   migrations: ['../../src/migrations/*{.ts,.js}'],
//   logging:true,
//   cli: {
//     migrationsDir: '../../src/migrations'
//   },
// }
// //

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config';
import { env } from 'node:process';
// const dbConfig = config.get('db');
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: 5432,
  database: 'jay-last',
  host: "127.0.0.1",
  username:  'postgres',
  password: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  logging:true,
  cli: {
    migrationsDir: '../../src/migrations'
  },
}

