import { PartialType } from '@nestjs/mapped-types';
import { CreateOffreemploiDto } from './create-offreemploi.dto';

export class UpdateOffreemploiDto extends PartialType(CreateOffreemploiDto) {}
