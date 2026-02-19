import { Module } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseController } from './entreprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entreprise } from './entities/entreprise.entity';
import { Notification } from 'src/notification/entities/notification.entity';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Offreemploi } from 'src/offreemploi/entities/offreemploi.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Entreprise , Notification,Conversation,Offreemploi])],
  controllers: [EntrepriseController],
  providers: [EntrepriseService],
})
export class EntrepriseModule {}
