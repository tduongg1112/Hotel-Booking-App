import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schema/booking.schema';
import { Connection, Model } from 'mongoose';
import { CreateBookingDto, UpdateBookingDto } from './dto/req/booking.request';
import { ApiError } from 'src/common/api';
import { BookingResponse } from './dto/res/booking.response';
import { Hotel, HotelDocument } from '../hotel/schema/hotel.schema';
import { BookingStatus } from 'src/common/enums/booking.enum';

@Injectable()
export class BookingService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
        @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
        @InjectConnection() private conn: Connection
    ) {}

    toBookingResponse(booking: BookingDocument): BookingResponse {
        return {
            id: booking._id.toString(),
            userId: booking.userId,
            hotelId: booking.hotelId,
            checkInDate: booking.checkInDate.toISOString(),
            checkOutDate: booking.checkOutDate.toISOString(),
            roomCount: booking.roomCount,
            totalPrice: booking.totalPrice,
            status: booking.status,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        };
    }

    async createBooking(data: CreateBookingDto): Promise<BookingResponse> {
        const session = await this.conn.startSession();
        session.startTransaction();

        try {
            const hotel = await this.hotelModel.findById(data.hotelId);
            if (!hotel) throw new ApiError('Không tìm thấy khách sạn!', HttpStatus.BAD_REQUEST);

            const totalPrice = data.totalPrice ?? hotel.averagePrice * data.roomCount;

            const booking = await this.bookingModel.create([{ 
                ...data, 
                totalPrice, 
                status: BookingStatus
            }], { session });

            await session.commitTransaction();
            return this.toBookingResponse(booking[0]);
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }

    async findAll(): Promise<BookingResponse[]> {
        const bookings = await this.bookingModel.find().populate('hotelId', 'name');
        return bookings.map(b => this.toBookingResponse(b));
    }

    async findById(id: string): Promise<BookingResponse> {
        const booking = await this.bookingModel.findById(id);
        if (!booking) throw new ApiError('Không tìm thấy đơn đặt phòng!', HttpStatus.NOT_FOUND);
        return this.toBookingResponse(booking);
    }

    async updateBooking(id: string, data: UpdateBookingDto): Promise<BookingResponse> {
        const updated = await this.bookingModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new ApiError('Cập nhật đặt phòng thất bại!', HttpStatus.BAD_REQUEST);
        return this.toBookingResponse(updated);
    }

    async deleteBooking(id: string): Promise<BookingResponse> {
        const session = await this.conn.startSession();
        session.startTransaction();
        try {
            const deleted = await this.bookingModel.findByIdAndDelete(id);
            if (!deleted) throw new ApiError('Hủy đặt phòng thất bại!', HttpStatus.BAD_REQUEST);
            await session.commitTransaction();
            return this.toBookingResponse(deleted);
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }
}
