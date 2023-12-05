import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'
import * as bcrypt from 'bcrypt'
import { ResponseUserType } from '@/types/User'
import { SignUpUserDto } from '@/auth/dto/sign-up-user.dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  /**
   * ログイン
   * @param signInUserDto
   * @returns
   */
  async signIn(signInUserDto: SignInUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signInUserDto.email,
      },
    })
    // パスワード照合
    if (
      !user ||
      !(await bcrypt.compare(signInUserDto.password, user.password))
    ) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが違います',
      )
    }
    const resUser: ResponseUserType = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    return {
      user: resUser,
    }
  }

  /**
   * 会員登録
   * @param signUpUserDto
   * @returns
   */
  async signUp(signUpUserDto: SignUpUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: signUpUserDto.email,
      },
    })
    // メールアドレス確認
    if (!!user)
      throw new UnauthorizedException(
        `${signUpUserDto.email} は別のアカウントで使用されています。`,
      )

    const hashPassword = await bcrypt.hash(signUpUserDto.password, 10)
    const createdUser = await this.prisma.user.create({
      data: {
        name: signUpUserDto.name,
        email: signUpUserDto.email,
        password: hashPassword,
      },
    })

    const resUser: ResponseUserType = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    }

    return {
      user: resUser,
    }
  }
}
