import {
  Controller,
  Post,
  HttpCode,
  Body,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'
import { SignUpUserDto } from '@/auth/dto/sign-up-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_in')
  @HttpCode(200)
  async signIn(@Body(ValidationPipe) signInUserDto: SignInUserDto) {
    return await this.authService.signIn(signInUserDto)
  }

  @Post('sign_up')
  @HttpCode(201)
  async signUp(@Body(ValidationPipe) signUpUserDto: SignUpUserDto) {
    return await this.authService.signUp(signUpUserDto)
  }
}
