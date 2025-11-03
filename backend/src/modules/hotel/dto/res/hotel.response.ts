import { ApiProperty } from "@nestjs/swagger";
import { TimeStamp } from "src/common/metadata";

export class HotelResponse extends TimeStamp {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    city?: string;

    @ApiProperty()
    averagePrice?: number;

    @ApiProperty()
    rating?: number;

    @ApiProperty()
    amenities?: string[];

    @ApiProperty()
    images?: string[];

    @ApiProperty()
    description?: string;
}
