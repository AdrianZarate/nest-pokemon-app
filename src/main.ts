import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        // Enable implicit type conversion
        enableImplicitConversion: true, // Allow primitive types to be converted
      },
    }),
  );
  app.setGlobalPrefix('api/v2');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
