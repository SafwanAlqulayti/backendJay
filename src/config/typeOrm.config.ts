import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config';
// const dbConfig = config.get('db');



export const typeOrm :TypeOrmModuleOptions={



    type: 'postgres',
  port: 5432,
  database: 'jay',
  host: 'localhost',
  username: 'postgres',
  password: 'Mm121212',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,




}