import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { Entreprise } from 'src/entreprise/entities/entreprise.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Notification , Entreprise])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
