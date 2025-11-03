import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TimeStamp } from "src/common/metadata";

@Schema({ timestamps: true })
export class Hotel extends TimeStamp {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: string;

    @Prop()
    city: string;

    @Prop({ default: 0 })
    averagePrice: number;

    @Prop({ default: 0 })
    rating: number;

    @Prop({ type: [String], default: [] })
    amenities: string[];

    @Prop({ type: [String], default: [] })
    images: string[];

    @Prop()
    description: string;
}

export type HotelDocument = HydratedDocument<Hotel>;
export const HotelSchema = SchemaFactory.createForClass(Hotel);
