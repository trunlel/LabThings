import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';
import { DeviceEntity } from '../entities/device.entity';
import { UserDeviceEntity } from '../entities/user-device.entity';
import { JwtPayloadUser } from 'src/utils/jwt-payload-user';

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
    description: any,
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
        console.log(saveDevice.deviceCreated);
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

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

// linkDeviceInUser(id: number, deviceToLink): Promise<boolean> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const deviceToBeSaved = await this.userRepository.findOne({
//         where: {
//           userId: id,
//         },
//         relations: {
//           devices: true,
//         },
//       });

//       await this.deviceRepository.save(deviceToBeSaved);

//       resolve(true);
//     } catch (error) {
//       reject({
//         code: error.code,
//         detail: error.detail,
//       });
//     }
//   });
// }

// linkDeviceInUser(id: number, deviceToLink): Promise<boolean> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const linkedDevice = this.userRepository.create({
//         userId: id,
//         devices: deviceToLink,
//       });
//       linkedDevice.addDevice(deviceToLink);
//       await this.userRepository.save(linkedDevice);

//       resolve(true);
//     } catch (error) {
//       console.log(error);
//       reject({
//         code: error.code,
//         detail: error.detail,
//       });
//     }
//   });
// // }

// linkeDeviceInUser(
//     userPayload: JwtPayloadUser,
//     description: localDeviceDto,
//     followingId: number,
//   ) {
//     return new Promise<void>(async (resolve) => {
//       const user = await this.userRepository.findOne({
//         where: {
//           userId: userPayload.id,
//         },
//         relations: {
//           devices: true,
//         },
//       });

//       const device = await this.deviceRepository.findOne({
//         where: {
//           id: followingId,
//         },
//       });

//       if (user && device) {
//         const saveDevice = await this.userDeviceRepository.create();
//         saveDevice.deviceCreated = device;
//         saveDevice.user = user;
//         saveDevice.room = description.room;
//         saveDevice.local = description.local;
//         user.addDevice(saveDevice);
//         this.userRepository.save(user);
//       }
//       resolve();
//     });
//   }

// linkDeviceInUser(id: number, linkedDevice: localDeviceDto): Promise<any> {
//   return new Promise(async (resolve) => {
//     let devicesLinked = this.deviceRepository.create();
//     devicesLinked = { ...linkedDevice, ...devicesLinked };
//     const user: UserEntity = await this.userRepository.findOne({
//       where: { userId: id },
//       relations: {
//         devices: true,
//       },
//     });
//     console.log(user);
//     user.addDevice(devicesLinked);
//     this.userRepository.save(user);

//     resolve(devicesLinked);
//   });
// }

// linkeDeviceInUser(
//   userPayload: JwtPayloadUser,
//   description: localDeviceDto,
//   deviceId: number,
// ) {
//   return new Promise(async (resolve) => {
//     const user: UserEntity = await this.userRepository.findOne({
//       where: {
//         userId: deviceId,
//       },
//       relations: {

//       },
//     });

//     const dispositivos: DeviceEntity = await this.deviceRepository.findOne({
//       where: { id: deviceId },
//     });
//   });

//   let devices = this.userDeviceRepository.create();
//   devices = { ...deviceCreated, ...devices };

//   devices.deviceCreated;
// }
