import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// const dbConfig = config.get('db');
console.log(`${Number(process.env.DB_PORT)}`);
export const typeOrm: TypeOrmModuleOptions = {
  type: 'postgres',
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE, //process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['../../src/migrations/*{.ts,.js}'],
  logging: true,
  cli: {
    migrationsDir: '../../src/migrations',
  },
  // url: process.env.NODE_ENV === 'prod' ? 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com' : '',
  // ssl: { rejectUnauthorized: process.env.NODE_ENV === 'prod' ? false : true }Required in heroku
  // ssl: { rejectUnauthorized: false } Required in heroku
};
