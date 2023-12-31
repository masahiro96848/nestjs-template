import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  // Cors対応
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost'],
  })
  await app.listen(3000)
}
bootstrap()
