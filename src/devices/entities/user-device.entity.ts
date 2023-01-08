import {
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import { LocalEnum } from '../enum/local-device.enum';
import { RoomEnum } from '../enum/room-device.enum';
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
  @JoinColumn({ name: 'user_id' }) // opcional para OneToMany
  user: UserEntity;

  @ManyToOne(() => DeviceEntity, (device) => device.userCreated, {
    onDelete: 'SET NULL',
  })
  deviceCreated: DeviceEntity;
}
