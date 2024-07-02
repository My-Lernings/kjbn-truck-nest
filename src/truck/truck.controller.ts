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

    /**
     * Retrieves the trucks within the specified bounds.
     *
     * @param {BoundsDTO} body - The bounds of the area to search within.
     * @returns {Promise<TruckModel[]>} A promise that resolves to an array of truck models within the specified bounds.
     */
    @Post('/getinbounds')
    test(@Body() body: BoundsDTO) {
       
        return this.truckService.getWithinBounds(body);
    }

    /**
     * Retrieves the menu for a specific truck identified by the given ID.
     *
     * @param {string} id - The ID of the truck.
     * @return {Object} The menu of the truck.
     */
    @Get('/menu/:id')
    getMenu(@Param('id') id: string): Object {
        console.log(id)
        return this.truckService.getMenu(id);
    }

}
