import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir peticiones desde el Frontend (Vite)
  app.enableCors();
  
  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}
bootstrap();
