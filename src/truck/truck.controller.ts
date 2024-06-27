import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TruckService } from './truck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDTO } from './dto/test.dto';

@Controller('truck')
export class TruckController {
    constructor(
        private readonly truckService: TruckService
    ) {


    }

    @Get('/:lat/:lon')
    getTruck(@Param('lat') lat: string, @Param('lon') lon: string) {

        return this.truckService.getTruck(lat, lon);
    }

    @Post('/test')
    test(@Body() body: [TestDTO]) {
        
        return this.truckService.test(body);
    }

}
