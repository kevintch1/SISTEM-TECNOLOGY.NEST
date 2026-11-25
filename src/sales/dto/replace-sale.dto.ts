import { Type } from 'class-transformer';
import { IsDateString, IsInt, Max, Min } from 'class-validator';

export class ReplaceSaleDto {
  @Type(() => Number)
  @IsInt({ message: 'clientId debe ser un número entero' })
  @Min(1, { message: 'clientId debe ser mayor que cero' })
  @Max(2_147_483_647, { message: 'clientId excede el rango de un entero' })
  clientId!: number;

  @Type(() => Number)
  @IsInt({ message: 'employeeId debe ser un número entero' })
  @Min(1, { message: 'employeeId debe ser mayor que cero' })
  @Max(2_147_483_647, { message: 'employeeId excede el rango de un entero' })
  employeeId!: number;

  @IsDateString(
    { strict: true, strictSeparator: true },
    { message: 'date debe ser una fecha válida en formato ISO' },
  )
  date!: string;
}
