import { DataSource } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { AddressEntity } from 'src/users/entities/address.entity';
import { DeviceEntity } from './entities/device.entity';
import { UserDeviceEntity } from './entities/user-device.entity';

export const deviceProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DeviceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ADDRESS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AddressEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'USER_DEVICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserDeviceEntity),
    inject: ['DATA_SOURCE'],
  },
];
