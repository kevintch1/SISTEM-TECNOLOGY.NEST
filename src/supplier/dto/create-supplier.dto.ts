import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({
    description: 'Nombre del proveedor',
    example: 'Distribuidora Central',
  })
  @IsString({ message: 'El nombre del proveedor debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del proveedor es obligatorio' })
  name!: string;

  @ApiPropertyOptional({
    description: 'Número telefónico del proveedor',
    example: '3001234567',
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  phone?: string;
}
