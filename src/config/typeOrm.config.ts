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
//

import { TypeOrmModuleOptions } from '@nestjs/typeorm'
// const dbConfig = config.get('db');
console.log(`${Number(process.env.DB_PORT)

  }`)
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  logging: true,
  cli: {
    migrationsDir: '../../src/migrations'
  },
  // url: process.env.NODE_ENV === 'prod' ? 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com' : '',
  // ssl: { rejectUnauthorized: process.env.NODE_ENV === 'prod' ? false : true }
  ssl: { rejectUnauthorized: false }

}





// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';

// // tslint:disable-next-line: no-var-requires
// require('dotenv').config();

// class ConfigService {

//   constructor(private env: { [k: string]: string | undefined }) { }

//   //...etc

//   public getTypeOrmConfig(): TypeOrmModuleOptions {
//     return {

//       type: 'postgres',
//       port: Number(process.env.DB_PORT),
//       database: 'd25193hhd9qrgr',
//       host: 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com',
//       username: 'vhvvooqdcapddc',
//       password: 'c0a39e7e150529b00bab949f4703400d96059b7f37d18813be8baa6b4dfb8c4a',
//       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//       migrations: ['../../**/migrations/*{.ts,.js}'],
//       logging: true,
//       cli: {
//         migrationsDir: '../../src/migrations'
//       },
//       synchronize: true,
//       url: process.env.NODE_ENV === 'prod' ? 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com': '',
//       ssl: { rejectUnauthorized: process.env.NODE_ENV === 'prod' ? true : false}
//     };
//   }
// }

// const configService = new ConfigService(process.env);

// export default configService;