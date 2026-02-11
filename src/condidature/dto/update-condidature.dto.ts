import { PartialType } from '@nestjs/mapped-types';
import { CreateCondidatureDto } from './create-condidature.dto';

export class UpdateCondidatureDto extends PartialType(CreateCondidatureDto) {}
