import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  addressId: number;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  neighborhood: string;

  @Column()
  number: number;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  complement: string;

  @OneToOne(() => UserEntity, (user) => user.userId)
  user: UserEntity;
}
