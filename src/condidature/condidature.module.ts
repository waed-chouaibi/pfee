import { Module } from '@nestjs/common';
import { CondidatureService } from './condidature.service';
import { CondidatureController } from './condidature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condidature } from './entities/condidature.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Condidature])],
  controllers: [CondidatureController],
  providers: [CondidatureService],
})
export class CondidatureModule {}
