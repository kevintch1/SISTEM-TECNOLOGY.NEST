
import {
    IsInt,
    IsNumber,
    IsPositive,
} from 'class-validator';

export class CreatePurchaseDetailDto {
    @IsInt()
    @IsPositive()
    quantity!: number;

    @IsNumber()
    @IsPositive()
    unitPrice!: number;

    @IsInt()
    @IsPositive()
    purchaseId!: number;

    @IsInt()
    @IsPositive()
    productId!: number;
}
