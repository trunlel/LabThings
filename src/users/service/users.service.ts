import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AddressDTO } from '../dto/address-user.dto';
import { AddressEntity } from '../entities/address.entity';
import { authDto } from '../dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const { password } = createUserDto;
        const newUser = this.userRepository.create(createUserDto);
        newUser.salt = await bcrypt.genSalt(14);
        newUser.password = await this.hashPassword(password, newUser.salt);
        const user: UserEntity = await this.userRepository.save(newUser);
        delete user.password;
        delete user.salt;
        resolve(user);
      } catch (error) {
        reject({ detail: error.detail, code: error.ccode });
      }
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.userRepository.find({
          relations: {
            address: true,
          },
        });
        resolve(res);
      } catch (error) {
        reject({ detail: error.detail, code: error.ccode });
      }
    });
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

// create(createUserDto: CreateUserDto) {
//   console.log(createUserDto);
//   return 'This action adds a new user';
// }

// Borala(createdUser: CreateUserDto): Promise<UserEntity> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const userToBeSaved = await this.userRepository.create(createdUser);
//       const user: UserEntity = await this.userRepository.save(userToBeSaved);
//       resolve(user);
//     } catch (error) {
//       reject({ code: error.code, detail: error.detail });
//     }
//   });
// }

// findAll(id: number): Promise<UserEntity> {
//   return new Promise(async (resolve) => {
//     const res = await this.userRepository.findOne({
//       where: {
//         userId: id,
//       },
//       relations: {
//         name: true,
//         email: true,
//       },
//     });
//     resolve(res);
//   });
// }

// createUser(createdUser: CreateUserDto): Promise<UserEntity> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const { email, name, password, phone, photoUrl, address } = createdUser;
//       const user = this.userRepository.create();
//       user.email = email;
//       user.name = name;
//       user.phone = phone;
//       user.photoUrl = photoUrl;
//       user.salt = await bcrypt.genSalt(12);
//       user.password = await this.hashPassword(password, user.salt);
//       const userToBeSaved = await this.userRepository.create(user);
//       const userCreated = await this.userRepository.save(userToBeSaved);
//       delete userCreated.password;
//       delete user.salt;
//       resolve(userCreated);
//     } catch (error) {
//       reject({ code: error.code, detail: error.detail });
//     }
//   });
// }

//  async findAll(): Promise<UserEntity[]> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         resolve(await this.userRepository.find());
//         resolve(null);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

// async findAll(): Promise<UserEntity[]> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       resolve(await this.userRepository.find());
//       resolve(null);
//     } catch (error) {
//       reject(error);
//     }
//   });
// }
