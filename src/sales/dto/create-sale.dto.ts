import { Type } from 'class-transformer';
import { IsDateString, IsInt, ValidateIf, Min } from 'class-validator';

export class CreateSaleDto {
  @Type(() => Number)
  @IsInt({ message: 'clientId debe ser un número entero' })
  @Min(1, { message: 'clientId debe ser mayor que cero' })
  clientId!: number;

  @Type(() => Number)
  @IsInt({ message: 'employeeId debe ser un número entero' })
  @Min(1, { message: 'employeeId debe ser mayor que cero' })
  employeeId!: number;

  @ValidateIf((_sale, value) => value !== undefined)
  @IsDateString(
    {},
    { message: 'date debe ser una fecha válida en formato ISO' },
  )
  date?: string;
}
