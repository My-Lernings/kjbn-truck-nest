import { Injectable } from '@nestjs/common';
import { TruckModel } from './schemas/truck.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { TestDTO } from './dto/test.dto';

@Injectable()
export class TruckService {
    constructor(@InjectModel(TruckModel.name) private truckModel: Model<TruckModel | null>) { }

    test(body: [TestDTO]) {
        try {

            for (let index = 0; index < body.length; index++) {
                const element = body[index];
                this.truckModel.create({
                    ...element,
                    location: {
                        type: 'Point',
                        coordinates: [parseFloat(element.longitude), parseFloat(element.latitude)]
                    }
                })
            }
        } catch (error) {

        }
    }



    async getTruck(lat: string, lon: string) {
        try {

            return await this.truckModel.find(
                {
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(lon), parseFloat(lat)]
                            },
                            $maxDistance: 10000 // 10km
                        }
                    }
                },
                {},
                {
                    limit: 10
                }
            );


        } catch (error) {
            throw error
        }
    }
}
