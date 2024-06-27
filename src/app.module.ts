import { Module } from '@nestjs/common';

import { TruckModule } from './truck/truck.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TruckModule,
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      autoIndex: true
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
