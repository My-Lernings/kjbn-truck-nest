import { IsNotEmpty, IsNumber } from "class-validator"

export class BoundsDTO {
    @IsNotEmpty()
    @IsNumber()
    minlat: number
    @IsNotEmpty()
    @IsNumber()
    minlon: number
    @IsNotEmpty()
    @IsNumber()
    maxlat: number
    @IsNotEmpty()
    @IsNumber()
    maxlon: number
}