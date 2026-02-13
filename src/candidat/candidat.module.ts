import { Module } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CandidatController } from './candidat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidat } from './entities/candidat.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Candidat])],
  controllers: [CandidatController],
  providers: [CandidatService],
})
export class CandidatModule {}
