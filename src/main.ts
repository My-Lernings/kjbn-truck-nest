import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const corsOptions: CorsOptions = {
    origin: [/^http:\/\/localhost:\d+$/, 'https://66817564cd6edb088128686e--chic-froyo-63e35e.netlify.app/'],// Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials like cookies
  };
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })
  app.enableCors(corsOptions);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
// docker run --rm -p 3000:3000 nestjs-app
