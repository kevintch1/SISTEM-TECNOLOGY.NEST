import { Type } from 'class-transformer';
import { IsInt, Matches, Min } from 'class-validator';

export class CreateSaleDetailDto {
  @Type(() => Number)
  @IsInt({ message: 'quantity debe ser un número entero' })
  @Min(1, { message: 'quantity debe ser mayor que cero' })
  quantity!: number;

  @Type(() => String)
  @Matches(/^(?:0|[1-9]\d{0,34})(?:\.\d{1,30})?$/, {
    message:
      'unitPrice debe ser un decimal no negativo con hasta 35 dígitos enteros y 30 decimales',
  })
  unitPrice!: string;

  @Type(() => Number)
  @IsInt({ message: 'saleId debe ser un número entero' })
  @Min(1, { message: 'saleId debe ser mayor que cero' })
  saleId!: number;

  @Type(() => Number)
  @IsInt({ message: 'productId debe ser un número entero' })
  @Min(1, { message: 'productId debe ser mayor que cero' })
  productId!: number;
}
