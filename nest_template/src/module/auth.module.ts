import { AuthController } from '@/controller/auth.controller'
import { AuthService } from '@/service/auth.service'
import { PrismaService } from '@/service/prisma.service'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
