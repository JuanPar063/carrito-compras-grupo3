import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para el frontend
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Habilitar validación global
  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3001); // Cambiar puerto para evitar conflicto con React
}
bootstrap();