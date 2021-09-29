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

// import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// import { env } from 'node:process';
// // const dbConfig = config.get('db');
// console.log(`${
// Number(process.env.DB_PORT)

// }`)
// export const typeOrm: TypeOrmModuleOptions = {
//   type: 'postgres',
//   port:Number(process.env.DB_PORT),
//   database: process.env.DB_DATABASE,
//   host: process.env.DB_HOST,
//   username:  process.env.DB_USERNAME || 'postgres',
//   password:  process.env.DB_PASSWORD || 'postgres',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
//   migrations: ['../../src/migrations/*{.ts,.js}'],
//   logging:true,
//   cli: {
//     migrationsDir: '../../src/migrations'
//   },
// }

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  //...etc

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {

      type: 'postgres',
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      migrations: ['../../**/migrations/*{.ts,.js}'],
      logging: true,
      cli: {
        migrationsDir: '../../src/migrations'
      },
      synchronize: true,
      //ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env);

export default configService;