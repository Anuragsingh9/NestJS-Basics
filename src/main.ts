import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json()); // Ensure JSON parsing
  app.use(bodyParser.urlencoded({ extended: true })); // Handle form data
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on port: ${process.env.PORT}`);
}
bootstrap();
