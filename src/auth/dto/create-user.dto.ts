import { IsEmail, IsEnum, MinLength } from 'class-validator';
import { UserRole } from '../../generated/prisma/client.js';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;
}
