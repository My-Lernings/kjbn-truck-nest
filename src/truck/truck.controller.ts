import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TruckService } from './truck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TestDTO } from './dto/test.dto';
import { BoundsDTO } from './dto/Bounds.dto';

@Controller('truck')
export class TruckController {
    constructor(
        private readonly truckService: TruckService
    ) {


    }

    @Post('/getinbounds')
    test(@Body() body: BoundsDTO) {
       
        return this.truckService.getWithinBounds(body);
    }


    @Get('/menu/:id')
    getMenu(@Param('id') id: string): Object {
        console.log(id)
        return this.truckService.getMenu(id);
    }

}
