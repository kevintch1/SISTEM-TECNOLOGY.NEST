import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDetailDto } from './create-sale-detail.dto.js';

export class UpdateSaleDetailDto extends PartialType(CreateSaleDetailDto, {
  skipNullProperties: false,
}) {}
