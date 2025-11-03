import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { BookingStatus } from "src/common/enums/booking.enum";

export class CreateBookingDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập ID người dùng!' })
    @IsMongoId({ message: 'ID người dùng không hợp lệ!' })
    userId: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập ID khách sạn!' })
    @IsMongoId({ message: 'ID khách sạn không hợp lệ!' })
    hotelId: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng chọn ngày check-in!' })
    @IsDateString()
    checkInDate: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng chọn ngày check-out!' })
    @IsDateString()
    checkOutDate: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Số lượng phòng phải là số!' })
    @Min(1)
    roomCount: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: 'Giá tổng phải là số!' })
    @Min(0)
    totalPrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(BookingStatus, { message: 'Trạng thái đặt phòng không hợp lệ!' })
    status?: BookingStatus;
}

export class UpdateBookingDto {
    @ApiProperty()
    @IsOptional()
    @IsDateString()
    checkInDate?: string;

    @ApiProperty()
    @IsOptional()
    @IsDateString()
    checkOutDate?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(1)
    roomCount?: number;

    @ApiProperty()
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;
}
