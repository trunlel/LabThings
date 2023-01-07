/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import DeviceSeeder from './seeds/device.seed';
import { Device } from './seeds/device';
require('dotenv-flow').config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    __dirname + '/../../**/**/*.entity{.ts,.js}', // As entidades serão buscadas em todas as pastas e precisa existir .entity no nome do arquivo.
    'dist/**/**/*.entity.js',
    Device,
  ],
  migrations: [
    __dirname + '../migrations/*{.ts,.js}',
    __dirname + './migrations/*{.ts,.js}',
    'dist/core/database/migrations/*{.ts,.js}',
  ],
  synchronize: true, //Essa propriedade não deve ser utilizada em produção! Caso contrário os dados poderão ser perdidos.
  migrationsRun: false,
  migrationsTableName: 'history',
  seeds: [DeviceSeeder],
};

export const AppDataSource = new DataSource(options);
