import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100, 
    }) as any,
  );

  // Apply CSRF protection middleware
  app.use(csurf())
  await app.listen(3000);
}
bootstrap();
