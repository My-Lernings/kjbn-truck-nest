import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors: true});
  const corsOptions: CorsOptions = {
    origin: [/^http:\/\/localhost:\d+$/],// Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials like cookies
  };
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
// docker run --rm -p 3000:3000 nestjs-app
