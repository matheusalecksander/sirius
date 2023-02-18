import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors) {
      return errors;
    },
  }))
  await app.listen(4500);
  console.log("App is running");
}

bootstrap();
