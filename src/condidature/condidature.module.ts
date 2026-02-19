import { Module } from '@nestjs/common';
import { CondidatureService } from './condidature.service';
import { CondidatureController } from './condidature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condidature } from './entities/condidature.entity';
import { Offreemploi } from 'src/offreemploi/entities/offreemploi.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Condidature,Offreemploi])],
  controllers: [CondidatureController],
  providers: [CondidatureService],
})
export class CondidatureModule {}
