import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto, UpdateHotelDto } from './dto/req/hotel.request';
import { HotelResponse } from './dto/res/hotel.response';
import { BaseResponse } from 'src/common/api';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BearerType, UserRole } from 'src/common/enums';
import { Roles } from 'src/common/decorators/role.decorator';

@ApiTags('Hotels')
@ApiBearerAuth(BearerType.AccessToken)
@Controller('hotel')
export class HotelController {
    constructor(private hotelService: HotelService) {}

    @Post()
    @Roles(UserRole.ADMIN)
    @ApiResponse({ status: 201, type: HotelResponse })
    async createHotel(@Body() hotelData: CreateHotelDto): Promise<BaseResponse<HotelResponse>> {
        const result = await this.hotelService.createHotel(hotelData);
        return {
            status: 'success',
            message: 'Thêm khách sạn thành công!',
            data: result
        };
    }

    @Get()
    @ApiResponse({ status: 200, type: [HotelResponse] })
    async getAllHotels(): Promise<BaseResponse<HotelResponse[]>> {
        const result = await this.hotelService.findAllHotels();
        return {
            status: 'success',
            message: 'Lấy danh sách khách sạn thành công!',
            data: result
        };
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: HotelResponse })
    @ApiParam({ name: 'id', description: 'Hotel ID' })
    async getHotelById(@Param('id') id: string): Promise<BaseResponse<HotelResponse>> {
        const result = await this.hotelService.findHotelById(id);
        return {
            status: 'success',
            message: 'Lấy thông tin khách sạn thành công!',
            data: result
        };
    }

    @Patch(':id')
    @ApiResponse({ status: 200, type: HotelResponse })
    @ApiParam({ name: 'id', description: 'Hotel ID' })
    async updateHotel(@Param('id') id: string, @Body() data: UpdateHotelDto): Promise<BaseResponse<HotelResponse>> {
        const result = await this.hotelService.updateHotel(id, data);
        return {
            status: 'success',
            message: 'Cập nhật thông tin khách sạn thành công!',
            data: result
        };
    }

    @Delete(':id')
    @ApiResponse({ status: 200, type: HotelResponse })
    @ApiParam({ name: 'id', description: 'Hotel ID' })
    async deleteHotel(@Param('id') id: string): Promise<BaseResponse<HotelResponse>> {
        const result = await this.hotelService.deleteHotel(id);
        return {
            status: 'success',
            message: 'Xóa khách sạn thành công!',
            data: result
        };
    }
}
