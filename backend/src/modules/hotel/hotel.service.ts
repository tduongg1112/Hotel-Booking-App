import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Hotel, HotelDocument } from './schema/hotel.schema';
import { Connection, Model } from 'mongoose';
import { CreateHotelDto, UpdateHotelDto } from './dto/req/hotel.request';
import { ApiError } from 'src/common/api';
import { HotelResponse } from './dto/res/hotel.response';

@Injectable()
export class HotelService {
    constructor(
        @InjectModel(Hotel.name) private hotelModel: Model<HotelDocument>,
        @InjectConnection() private conn: Connection
    ) {}

    toHotelResponse(hotel: HotelDocument): HotelResponse {
        return {
            id: hotel._id.toString(),
            name: hotel.name,
            address: hotel.address,
            city: hotel.city,
            averagePrice: hotel.averagePrice,
            rating: hotel.rating,
            amenities: hotel.amenities,
            images: hotel.images,
            description: hotel.description,
            createdAt: hotel.createdAt,
            updatedAt: hotel.updatedAt
        };
    }

    async createHotel(data: CreateHotelDto): Promise<HotelResponse> {
        const exist = await this.hotelModel.findOne({ name: data.name, address: data.address });
        if (exist) throw new ApiError('Khách sạn đã tồn tại!', HttpStatus.BAD_REQUEST);

        const hotel = await this.hotelModel.create(data);
        return this.toHotelResponse(hotel);
    }

    async findAllHotels(): Promise<HotelResponse[]> {
        const hotels = await this.hotelModel.find();
        return hotels.map(h => this.toHotelResponse(h));
    }

    async findHotelById(id: string): Promise<HotelResponse> {
        const hotel = await this.hotelModel.findById(id);
        if (!hotel) throw new ApiError('Không tìm thấy khách sạn!', HttpStatus.NOT_FOUND);
        return this.toHotelResponse(hotel);
    }

    async updateHotel(id: string, data: UpdateHotelDto): Promise<HotelResponse> {
        const updated = await this.hotelModel.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new ApiError('Cập nhật khách sạn thất bại!', HttpStatus.BAD_REQUEST);
        return this.toHotelResponse(updated);
    }

    async deleteHotel(id: string): Promise<HotelResponse> {
        const session = await this.conn.startSession();
        session.startTransaction();
        try {
            const deleted = await this.hotelModel.findByIdAndDelete(id);
            if (!deleted) throw new ApiError('Xóa khách sạn thất bại!', HttpStatus.BAD_REQUEST);
            await session.commitTransaction();
            return this.toHotelResponse(deleted);
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }
}
