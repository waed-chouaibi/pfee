import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { ConversationModule } from './conversation/conversation.module';
import { OffreemploiModule } from './offreemploi/offreemploi.module';
import { CondidatureModule } from './condidature/condidature.module';
import { AdministrateurModule } from './administrateur/administrateur.module';
import { CandidatModule } from './candidat/candidat.module';
import { NotificationModule } from './notification/notification.module';
import { MessageModule } from './message/message.module';
import { CompetenceModule } from './competence/competence.module';
import { ExperienceModule } from './experience/experience.module';
import { FormationModule } from './formation/formation.module';
import { CertificationModule } from './certification/certification.module';
import { CvModule } from './cv/cv.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"waed",
    database:"pfedata",
    autoLoadEntities:true,
    entities:[__dirname + "/**/.entity{.ts,.js}"],
    synchronize:true,
  }), UtilisateurModule, EntrepriseModule, ConversationModule, OffreemploiModule, CondidatureModule, AdministrateurModule, CandidatModule, NotificationModule, MessageModule, CompetenceModule, ExperienceModule, FormationModule, CertificationModule, CvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
