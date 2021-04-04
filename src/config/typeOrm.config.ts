import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as config from 'config';
import { env } from 'node:process';
// const dbConfig = config.get('db');
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  database: 'jay',
  host: process.env.DB_HOST,
  username:  'postgres',
  password: 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: '../../src/migrations'
  },
}
