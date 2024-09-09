import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto): Promise<{ acess_token: string }> {
    return await this.authService.signIn(signInDto);
  }
}
