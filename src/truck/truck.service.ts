import { Injectable } from '@nestjs/common';
import { TruckModel } from './schemas/truck.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { TestDTO } from './dto/test.dto';
import { BoundsDTO } from './dto/Bounds.dto';
import menuMock from './mockdata/menu';

@Injectable()
export class TruckService {
 
    constructor(@InjectModel(TruckModel.name) private truckModel: Model<TruckModel | null>) { }




    getMenu(id: string): Object {
        return menuMock;
    }
    async getWithinBounds(body: BoundsDTO): Promise<TruckModel[]> {
   

        try {

            return await this.truckModel.find(
                {
                    location: {
                        $geoWithin: {
                            $box: [
                                [body.minlon, body.minlat],
                                [body.maxlon, body.maxlat]
                            ],
                        }
                    }
                },
                {},
                {
                    limit: 50
                }
            );


        } catch (error) {
            throw error
        }

    }

   


    async getTruck(lat: string, lon: string) : Promise<TruckModel[]> {
        try {

            return await this.truckModel.find(
                {
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(lon), parseFloat(lat)]
                            },
                            $maxDistance: 50000 // 10km
                        }
                    }
                },
                {},
                {
                    limit: 50
                }
            );


        } catch (error) {
            throw error
        }
    }
}
