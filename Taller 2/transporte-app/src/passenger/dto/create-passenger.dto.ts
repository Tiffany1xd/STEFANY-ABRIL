import { IsString, IsInt, MinLength, IsPositive } from 'class-validator';

export class CreatePassengerDto {
    @IsString()
    @MinLength(2)
    readonly name: string;

    @IsInt()
    @IsPositive()
    readonly age: number;

    @IsString()
    readonly ticketNumber: string;
}
