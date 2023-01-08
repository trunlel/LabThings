import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';
import { Device } from 'src/core/database/seeds/device';
import { LinkedEntity } from './entities/link-device.entity';

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
  {
    provide: 'LINKED_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LinkedEntity),
    inject: ['DATA_SOURCE'],
  },
];
