import { UserEntity } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { UserDeviceEntity } from './user-device.entity';

@Entity({ name: 'devices' })
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  madeBy: string;

  @Column()
  active: boolean;

  @Column()
  info: string;

  @Column()
  photoUrl: string;

  @Column()
  ip_address: string;

  @Column()
  mac_address: string;

  @OneToMany(() => UserDeviceEntity, (userDevices) => userDevices.user, {
    cascade: true,
  })
  userCreated: UserEntity[];

  // @ManyToOne(() => UserEntity, (user) => user.devices, {
  //   onDelete: 'SET NULL',
  // })
}
