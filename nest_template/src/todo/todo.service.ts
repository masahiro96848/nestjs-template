import { PrismaService } from '@/prisma.service'
import { Injectable } from '@nestjs/common'

Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
}
