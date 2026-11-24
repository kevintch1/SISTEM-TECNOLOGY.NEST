import { Type } from 'class-transformer';
import { IsDateString, IsInt, Min } from 'class-validator';

export class ReplaceSaleDto {
  @Type(() => Number)
  @IsInt({ message: 'clientId debe ser un número entero' })
  @Min(1, { message: 'clientId debe ser mayor que cero' })
  clientId!: number;

  @Type(() => Number)
  @IsInt({ message: 'employeeId debe ser un número entero' })
  @Min(1, { message: 'employeeId debe ser mayor que cero' })
  employeeId!: number;

  @IsDateString(
    {},
    { message: 'date debe ser una fecha válida en formato ISO' },
  )
  date!: string;
}
