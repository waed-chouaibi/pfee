import { Module } from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { Entreprise } from 'src/entreprise/entities/entreprise.entity';
import { Administrateur } from 'src/administrateur/entities/administrateur.entity';
import { Candidat } from 'src/candidat/entities/candidat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Utilisateur,Entreprise,Administrateur,Candidat])],
  controllers: [UtilisateurController],
  providers: [UtilisateurService],
})
export class UtilisateurModule {}
