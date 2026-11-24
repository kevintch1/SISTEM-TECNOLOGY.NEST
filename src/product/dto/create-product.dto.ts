
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    IsInt,
    IsPositive,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsNumber()
    @IsPositive()
    price!: number;

    @IsInt()
    @Min(0)
    stock!: number;

    @IsInt()
    @IsPositive()
    categoryId!: number;
}
