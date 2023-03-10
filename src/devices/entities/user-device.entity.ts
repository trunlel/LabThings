import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'user_device' })
export class UserDeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  local: string;

  @Column()
  room: string;

  @ManyToOne(() => UserEntity, (user) => user.devicesCreated, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => DeviceEntity, (device) => device.userCreated, {
    onDelete: 'SET NULL',
  })
  deviceCreated: DeviceEntity;
}
