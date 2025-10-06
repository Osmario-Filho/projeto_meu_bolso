import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.BACKEND_PORT ?? 3001);
  console.log(process.env.BACKEND_PORT);
}
bootstrap();
