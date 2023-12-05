import {
  Controller,
  Post,
  HttpCode,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_in')
  @HttpCode(200)
  async signIn(@Body(ValidationPipe) signInUserDto: SignInUserDto) {
    return await this.authService.signIn(signInUserDto)
  }
}
