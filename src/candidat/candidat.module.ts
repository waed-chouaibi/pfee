import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidat } from './entities/candidat.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Condidature } from 'src/condidature/entities/condidature.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Cv } from 'src/cv/entities/cv.entity';
import { Certification } from 'src/certification/entities/certification.entity';
import { Experience } from 'src/experience/entities/experience.entity';
import { Competence } from 'src/competence/entities/competence.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Candidat,Conversation,Condidature,Notification,Cv,Certification,Experience,Competence])],
  controllers: [CandidatController],
  providers: [CandidatService],
})
export class CandidatModule {}
