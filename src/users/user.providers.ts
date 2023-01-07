import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';
import { Device } from 'src/core/database/seeds/device';

export const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AddressEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Device),
    inject: ['DATA_SOURCE'],
  },
];
