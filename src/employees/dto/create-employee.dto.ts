import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Employyees')
@Controller('employees')
export class CreateEmployeeDto {
  @ApiProperty({
    example: 'Enrique Alanis',
    description: 'Nombre completo del empleado',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    example: 'Vendedor',
    description: 'Puesto o cargo del empleado',
  })
  @IsOptional()
  @IsString()
  position?: string;
}
