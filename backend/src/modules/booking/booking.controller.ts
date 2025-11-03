import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/req/booking.request';
import { BookingResponse } from './dto/res/booking.response';
import { BaseResponse } from 'src/common/api';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BearerType, UserRole } from 'src/common/enums';
import { Roles } from 'src/common/decorators/role.decorator';

@ApiTags('Bookings')
@ApiBearerAuth(BearerType.AccessToken)
@Controller('booking')
export class BookingController {
    constructor(private bookingService: BookingService) {}

    @Post()
    @ApiResponse({ status: 201, type: BookingResponse })
    async createBooking(@Body() data: CreateBookingDto): Promise<BaseResponse<BookingResponse>> {
        const res = await this.bookingService.createBooking(data);
        return {
            status: 'success',
            message: 'Đặt phòng thành công!',
            data: res
        };
    }

    @Get()
    @Roles(UserRole.ADMIN)
    @ApiResponse({ status: 200, type: [BookingResponse] })
    async getAllBookings(): Promise<BaseResponse<BookingResponse[]>> {
        const res = await this.bookingService.findAll();
        return {
            status: 'success',
            message: 'Lấy danh sách đặt phòng thành công!',
            data: res
        };
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: BookingResponse })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    async getBookingById(@Param('id') id: string): Promise<BaseResponse<BookingResponse>> {
        const res = await this.bookingService.findById(id);
        return {
            status: 'success',
            message: 'Lấy thông tin đặt phòng thành công!',
            data: res
        };
    }

    @Patch(':id')
    @ApiResponse({ status: 200, type: BookingResponse })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    async updateBooking(
        @Param('id') id: string,
        @Body() data: UpdateBookingDto
    ): Promise<BaseResponse<BookingResponse>> {
        const res = await this.bookingService.updateBooking(id, data);
        return {
            status: 'success',
            message: 'Cập nhật thông tin đặt phòng thành công!',
            data: res
        };
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: BookingResponse })
    @ApiParam({ name: 'id', description: 'Booking ID' })
    async deleteBooking(@Param('id') id: string): Promise<BaseResponse<BookingResponse>> {
        const res = await this.bookingService.deleteBooking(id);
        return {
            status: 'success',
            message: 'Hủy đặt phòng thành công!',
            data: res
        };
    }
}
