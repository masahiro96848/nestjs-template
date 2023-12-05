import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { PrismaService } from '@/prisma.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
