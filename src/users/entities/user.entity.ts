import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import * as bcrypt from 'bcrypt';
import { Device } from 'src/core/database/seeds/device';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => AddressEntity, (address) => address.addressId, {
    cascade: true,
  })
  @JoinColumn({ name: 'addressId' })
  address: AddressEntity;

  @OneToMany('DeviceEntity', (device: Device) => device.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  devices: Device;

  // addDevices(device: DeviceEntity) {
  //   if (this.devices == null) {
  //     this.devices = new Array<DeviceEntity>();
  //   }
  //   this.devices.push(device);
  // }

  async checkPassword(receivedPassword: string): Promise<boolean> {
    const hash = await bcrypt.hash(receivedPassword, this.salt);
    return this.password === hash;
  }
}
