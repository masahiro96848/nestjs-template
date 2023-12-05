import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { JwtStrategy } from '@/lib/jwt/jwt.strategy'
import { LocalStrategy } from '@/lib/jwt/local.strategy'
import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '1800s',
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
