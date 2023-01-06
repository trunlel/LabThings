import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import * as bcrypt from 'bcrypt';

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

  async checkPassword(receivedPassword: string): Promise<boolean> {
    const hash = await bcrypt.hash(receivedPassword, this.salt);
    return this.password === hash;
  }
}
