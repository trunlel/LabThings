import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { authDto } from 'src/users/dto/login-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: authDto) {
    const user = await this.checkCredentials(credentials);
    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    // Informo o que vai conter no token quando decodificado.
    const jwtPayload = {
      id: user.userId,
      name: user.name,
      email: user.email,
      photo: user.photoUrl,
    };

    const token = await this.jwtService.sign(jwtPayload);
    return { token };
  }

  async checkCredentials(credentials: authDto) {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }
}

//  signIn(credentials: authDto): Promise<string> {
//     return new Promise(async (resolve, reject) => {
//       try {
//         const { email, password } = credentials;
//         const user = await this.userRepository.findOne({
//           where: { email: email },
//         });

//         if (!user?.salt) {
//           console.log('não tem usuario');
//           reject('não tem usuario');
//         }

//         if (await user.checkPassword(password)) {
//           const jwtPayload = {
//             id: user.userId,
//             name: user.name,
//             email: user.email,
//             photo: user.photoUrl,
//           };
//           console.log(jwtPayload);
//           resolve(this.jwtService.sign(jwtPayload));
//         }
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

//   async checkCredentials(credentials: authDto) {
//     const { email, password } = credentials;
//     const user = await this.userRepository.findOne({
//       where: {
//         email: email,
//       },
//     });

//     if (user && (await user.checkPassword(password))) {
//       return user;
//     }
//     return null;
//   }
