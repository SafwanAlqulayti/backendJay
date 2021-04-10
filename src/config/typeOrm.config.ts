import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config';
// const dbConfig = config.get('db');



export const typeOrm :TypeOrmModuleOptions={



  type: 'postgres',
  port: 5432,
  database: 'food',
  host: 'localhost',
  username: 'postgres',
  password: '123456',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],

  cli: {
    migrationsDir: '../../src/migrations'
  },



}
