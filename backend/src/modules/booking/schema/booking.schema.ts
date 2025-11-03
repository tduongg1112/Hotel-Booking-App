import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { TimeStamp } from "src/common/metadata";
import { BookingStatus } from "src/common/enums/booking.enum";

@Schema({ timestamps: true })
export class Booking extends TimeStamp {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ type: Types.ObjectId, ref: 'Hotel', required: true })
    hotelId: string;

    @Prop({ required: true })
    checkInDate: Date;

    @Prop({ required: true })
    checkOutDate: Date;

    @Prop({ required: true })
    roomCount: number;

    @Prop({ default: 0 })
    totalPrice: number;

    @Prop({ enum: BookingStatus, default: BookingStatus })
    status: BookingStatus;
}

export type BookingDocument = HydratedDocument<Booking>;
export const BookingSchema = SchemaFactory.createForClass(Booking);
