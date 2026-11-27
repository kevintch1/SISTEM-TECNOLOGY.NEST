import { ApiProperty } from '@nestjs/swagger';
import { IsIn, isInt, IsInt, IsPositive } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({
    description: 'Identificador del proveedor asociado a la compra',
    example: 1,
  })
  @IsInt({
    message: 'El identificador del proveedor debe ser un número entero',
  })
  @IsPositive({
    message: 'El identificador del proveedor debe ser mayor que cero',
  })
  supplierId!: number;
}
