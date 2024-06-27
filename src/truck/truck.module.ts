import { Module } from '@nestjs/common';
import { TruckService } from './truck.service';
import { TruckController } from './truck.controller';
import { MongooseModule } from '@nestjs/mongoose';
import TruckSchema, { TruckModel } from './schemas/truck.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: TruckModel.name, schema: TruckSchema }])
    ],
  providers: [TruckService],
  controllers: [TruckController]
})
export class TruckModule {}
