import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config';
import { env } from 'node:process';
// const dbConfig = config.get('db');
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  database: 'Jay',
  host: process.env.DB_HOST,
  username:  process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  logging:true,
  cli: {
    migrationsDir: '../../src/migrations'
  },
}
