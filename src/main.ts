import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, 
      max: 100, 
    }) as any,
  );
  app.enableCors();
  // Apply CSRF protection middleware
  // app.use(csurf({ cookie: true }))
  await app.listen(3000);
}
bootstrap();
