import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from '../entities/device.entity';
import { UserDeviceEntity } from '../entities/user-device.entity';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';
import { localDeviceDto } from '../dto/link-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    @Inject('DEVICE_REPOSITORY')
    private deviceRepository: Repository<DeviceEntity>,
    @Inject('USER_DEVICE_REPOSITORY')
    private userDeviceRepository: Repository<UserDeviceEntity>,
  ) {}

  linkDeviceInUser(
    userPayload: JwtPayloadUser,
    description: localDeviceDto,
    followingId: number,
  ) {
    return new Promise<void>(async (resolve) => {
      const user = await this.userRepository.findOne({
        where: {
          userId: userPayload.id,
        },
      });

      const device = await this.deviceRepository.findOne({
        where: {
          id: followingId,
        },
      });

      if (user && device) {
        const saveDevice = await this.userDeviceRepository.create();
        saveDevice.deviceCreated = device;
        saveDevice.user = user;
        saveDevice.room = description.room;
        saveDevice.local = description.local;
        user.addDevice(saveDevice);
        this.userRepository.save(user);
      }
      resolve();
    });
  }

  async findAllDevices(
    userPayload: JwtPayloadUser,
  ): Promise<UserDeviceEntity[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.userDeviceRepository.find({
          where: {
            user: {
              userId: userPayload.id,
            },
          },
          relations: {
            deviceCreated: true,
          },
        });
        resolve(res);
      } catch (error) {
        reject({ detail: error.detail, code: error.ccode });
      }
    });
  }

  async findOneDevice(deviceId: number): Promise<DeviceEntity> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.deviceRepository.findOne({
          where: { id: deviceId },
        });
        if (deviceId != res.id) {
          reject;
        }
        resolve(res);
      } catch (error) {
        reject({ detail: error.detail, code: error.ccode });
      }
    });
  }
}
