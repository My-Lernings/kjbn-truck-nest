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



    /**
     * Retrieves the menu based on the provided ID.
     *
     * @param {string} id - The ID of the menu.
     * @return {Object} The menu object.
     */
    getMenu(id: string): Object {
        return menuMock;
    }
    /**
 * Retrieves a list of trucks within the specified geographical bounds.
 *
 * @param {BoundsDTO} body - The bounds of the geographical area to search within.
 * @return {Promise<TruckModel[]>} A promise that resolves to an array of TruckModel objects within the specified bounds.
 */
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



    /**
     * Retrieves a list of trucks within a specified radius from a given latitude and longitude.
     *
     * @param {string} lat - The latitude of the location.
     * @param {string} lon - The longitude of the location.
     * @return {Promise<TruckModel[]>} A promise that resolves to an array of TruckModel objects.
     */
    async getTruck(lat: string, lon: string): Promise<TruckModel[]> {
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
