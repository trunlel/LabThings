import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AddressEntity } from '../entities/address.entity';
import { changePasswordDto } from '../dto/update-user.dto';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { error } from 'console';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<AddressEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
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

  async findUser(userPayload: JwtPayloadUser): Promise<UserEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.userRepository.findOne({
          where: {
            userId: userPayload.id,
          },
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

  async changePassword(userPayload: JwtPayloadUser, body: changePasswordDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
        userId: userPayload.id,
      },
    });
    const isValidPassword = await bcrypt.compare(
      body.old_password,
      user.password,
    );
    if (!isValidPassword) {
      throw new error();
    }

    user.password = await this.hashPassword(body.password, user.salt);

    await this.userRepository.save(user);
    return;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
