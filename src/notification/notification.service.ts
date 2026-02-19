import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Entreprise } from 'src/entreprise/entities/entreprise.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private notificationRepository:Repository<Notification>,
        @InjectRepository(Entreprise) private entrepriseRepository:Repository<Entreprise>

  ){}
  async create(createNotificationDto: CreateNotificationDto):Promise <Notification> {
    const entreprise = await this.entrepriseRepository.findOne({
      where:{id:createNotificationDto.entreprise}, 
      relations:["notifications"]
    })
    if(!entreprise){
      throw new NotFoundException('entreprise not exist')
    }
    const newNotification =await this.notificationRepository.create({...createNotificationDto , entreprise:entreprise})
    return this.notificationRepository.save(newNotification)
  }

  async findAll():Promise <Notification[]> {
    const notification=await this.notificationRepository.find({
      relations:["entreprise"]
    })
        if(notification.length==0){
          throw new NotFoundException("data not found")
        }
        return notification
  }

  async findOne(id: number):Promise <Notification> {
    const notification = await this.notificationRepository.findOne({
  where: { id },
});

    if(!notification){
      throw new NotFoundException("user not found")
    }
    return notification
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto):Promise <Notification> {
    const updateNotification=await this.notificationRepository.preload({...updateNotificationDto as DeepPartial<Notification>,id})
    if(!updateNotification){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.notificationRepository.save(updateNotification)
  }

  async remove(id: number) {
    const notification=await this.notificationRepository.findOneBy({id})
    if(!notification){
      throw new NotFoundException("user not found")
    }
    await this.notificationRepository.delete(id)
    return id
  }
}
