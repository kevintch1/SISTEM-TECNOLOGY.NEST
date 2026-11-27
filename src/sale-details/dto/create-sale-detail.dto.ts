import { Type } from 'class-transformer';
import { IsInt, Matches, Max, Min } from 'class-validator';

export class CreateSaleDetailDto {
  @Type(() => Number)
  @IsInt({ message: 'quantity debe ser un número entero' })
  @Min(1, { message: 'quantity debe ser mayor que cero' })
  @Max(2_147_483_647, { message: 'quantity excede el rango de un entero' })
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
  @Max(2_147_483_647, { message: 'saleId excede el rango de un entero' })
  saleId!: number;

  @Type(() => Number)
  @IsInt({ message: 'productId debe ser un número entero' })
  @Min(1, { message: 'productId debe ser mayor que cero' })
  @Max(2_147_483_647, { message: 'productId excede el rango de un entero' })
  productId!: number;
}
