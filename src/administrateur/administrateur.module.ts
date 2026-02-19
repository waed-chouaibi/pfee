import { Module } from '@nestjs/common';
import { AdministrateurService } from './administrateur.service';
import { AdministrateurController } from './administrateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrateur } from './entities/administrateur.entity';
import { Offreemploi } from 'src/offreemploi/entities/offreemploi.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Administrateur,Offreemploi,Utilisateur])],
  controllers: [AdministrateurController],
  providers: [AdministrateurService],
})
export class AdministrateurModule {}
