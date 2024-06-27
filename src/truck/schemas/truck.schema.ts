import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { FoodTruck, Location } from "../types/truck";

@Schema({ timestamps: true, collection: 'trucks' })
export class TruckModel  {
    @Prop({ required: true })
    objectid: string;
    @Prop({ required: false })
    applicant: string;
    @Prop({ required: false })
    facilitytype: string;
    @Prop({ required: false })
    cnn: string;
    @Prop({ required: false })
    locationdescription: string;
    @Prop({ required: false })
    address: string;
    @Prop({ required: false })
    permit: string;
    @Prop({ required: false })
    status: string;
    @Prop({ required: false })
    fooditems: string;
    @Prop({ required: false })
    latitude: string;
    @Prop({ required: false })
    longitude: string;
    @Prop({ required: false })
    schedule: string;
    @Prop({ required: false })
    received: string;
    @Prop({ required: false })
    priorpermit: string;
    @Prop({ required: false, type: Object, index: "2dsphere" })
    location: LocationModel;
}

export interface LocationModel{
    type: string,
    coordinates: [number, number]
}

const TruckSchema = SchemaFactory.createForClass(TruckModel);

export default TruckSchema