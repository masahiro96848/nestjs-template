import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '@/prisma.service'
import { SignInUserDto } from '@/auth/dto/sign-in-user.dto'
import * as bcrypt from 'bcrypt'
import { ResponseUserType } from '@/types/User'

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
}
