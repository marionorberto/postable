import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ acess_token: string }> {
    const userData = await this.usersService.findOne({
      where: {
        email: signInDto.email,
      },
    });

    if (!userData)
      throw new HttpException('email not invalid', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await this.validatePassword(
      signInDto.password,
      userData.password,
    );

    if (!isPasswordValid)
      throw new HttpException('password not invalid', HttpStatus.UNAUTHORIZED);

    const payloads = {
      sub: userData.id,
      username: userData.username,
    };

    return { acess_token: await this.jwtService.signAsync(payloads) };
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }
}
