import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, Max, IsArray } from "class-validator";

export class CreateHotelDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập tên khách sạn!' })
    @IsString()
    @MaxLength(100)
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Vui lòng nhập địa chỉ!' })
    @IsString()
    address: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: 'Giá trung bình phải là số!' })
    @Min(0)
    averagePrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    amenities?: string[]; // tiện ích

    @ApiProperty()
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty()
    @IsOptional()
    @IsNumber({}, { message: 'Xếp hạng phải là số!' })
    @Min(0)
    @Max(5)
    rating?: number;

    @ApiProperty()
    @IsOptional()
    description?: string;
}

export class UpdateHotelDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    city?: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    averagePrice?: number;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    amenities?: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    images?: string[];

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @ApiProperty()
    @IsOptional()
    description?: string;
}
