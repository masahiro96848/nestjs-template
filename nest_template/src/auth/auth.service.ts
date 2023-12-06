import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'
import * as bcrypt from 'bcrypt'
import { ResponseUserType } from '@/types/User'
import { SignUpUserDto } from '@/auth/dto/sign-up-user.dto'
import { JwtPayload } from '@/types/jwt-payload'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtSecret: JwtService,
  ) {}

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
      nickname: user.nickname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    }

    return {
      user: resUser,
      accessToken: this.jwtSecret.sign(payload), // jwtのアクセストークンを作成し返却
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
        nickname: signUpUserDto.nickname,
        email: signUpUserDto.email,
        password: hashPassword,
      },
    })

    const resUser: ResponseUserType = {
      id: createdUser.id,
      nickname: createdUser.nickname,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    }

    const payload: JwtPayload = {
      userId: createdUser.id,
      email: createdUser.email,
    }

    return {
      user: resUser,
      accessToken: this.jwtSecret.sign(payload), // jwtアクセストークンを作成し返却
    }
  }

  async authCheck(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) throw new UnauthorizedException('認証データが存在しません。')

    const resUser: ResponseUserType = {
      id: user.id,
      nickname: user.nickname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }

    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    }

    return {
      user: resUser,
      accessToken: this.jwtSecret.sign(payload), // jwtアクセストークンを作成し返却
    }
  }
}
