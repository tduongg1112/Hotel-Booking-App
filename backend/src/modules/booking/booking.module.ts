import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schema/booking.schema';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Hotel, HotelSchema } from '../hotel/schema/hotel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Hotel.name, schema: HotelSchema }
    ])
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule {}
