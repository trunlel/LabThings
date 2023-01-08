/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import DeviceSeeder from '../../devices/seeds/device.seed';
import { DeviceEntity } from '../../devices/entities/device.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { AddressEntity } from '../../users/entities/address.entity';
import { UserDeviceEntity } from '../../devices/entities/user-device.entity';
require('dotenv-flow').config();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [DeviceEntity, UserEntity, AddressEntity, UserDeviceEntity],
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
