import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  const uploadsPath = join(process.cwd(), 'uploads');

  console.log('Uploads path:', uploadsPath);

  app.useStaticAssets(uploadsPath, {
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3003);
}

bootstrap();