import {
  Controller,
  Post,
  HttpCode,
  Body,
  Request,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '@/auth/auth.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'
import { SignUpUserDto } from '@/auth/dto/sign-up-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { JwtPayload } from '@/types/jwt-payload'

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

  @UseGuards(AuthGuard('jwt'))
  @Post('authentication')
  @HttpCode(200)
  async authentication(@Request() req: { user: JwtPayload }) {
    return await this.authService.authCheck(req.user.userId)
  }
}
