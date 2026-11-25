import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Clients')
@Controller('clients')
export class CreateClientDto {
  @ApiProperty({
    example: 'Ivan Jimenez',
    description: 'Nombre completo del cliente',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string;

  @ApiProperty({
    example: 'ivan@gmail.com',
    description: 'Correo electronico del cliente',
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo no tiene un formato válido' })
  email?: string;
}
