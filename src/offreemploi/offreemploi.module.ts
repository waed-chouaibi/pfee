import { Module } from '@nestjs/common';
import { OffreemploiService } from './offreemploi.service';
import { OffreemploiController } from './offreemploi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offreemploi } from './entities/offreemploi.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Offreemploi])],
  controllers: [OffreemploiController],
  providers: [OffreemploiService],
})
export class OffreemploiModule {}
