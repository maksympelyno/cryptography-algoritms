import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Видаляє зайві поля, які не визначені в DTO
      forbidNonWhitelisted: true, // Забороняє надсилання неочікуваних полів
      transform: true, // Перетворює вхідні дані на типи, зазначені в DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
