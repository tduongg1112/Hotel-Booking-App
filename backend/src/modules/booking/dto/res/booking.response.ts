import { ApiProperty } from "@nestjs/swagger";
import { TimeStamp } from "src/common/metadata";
import { BookingStatus } from "src/common/enums/booking.enum";

export class BookingResponse extends TimeStamp {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    hotelId: string;

    @ApiProperty()
    checkInDate: string;

    @ApiProperty()
    checkOutDate: string;

    @ApiProperty()
    roomCount: number;

    @ApiProperty()
    totalPrice: number;

    @ApiProperty({ enum: BookingStatus })
    status: BookingStatus;
}
