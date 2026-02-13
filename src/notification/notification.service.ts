import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification) private userRepository:Repository<Notification>
  ){}
  async create(createNotificationDto: CreateNotificationDto):Promise <Notification> {
    const newNotification =await this.userRepository.create(createNotificationDto as Partial<Notification>)
    return this.userRepository.save(newNotification)
  }

  async findAll():Promise <Notification[]> {
    const notification=await this.userRepository.find()
        if(notification.length==0){
          throw new NotFoundException("data not found")
        }
        return notification
  }

  async findOne(id: number):Promise <Notification> {
    const notification = await this.userRepository.findOne({
  where: { id },
});

    if(!notification){
      throw new NotFoundException("user not found")
    }
    return notification
  }

  async update(id: number, updateNotificationDto: UpdateNotificationDto):Promise <Notification> {
    const updateNotification=await this.userRepository.preload({...updateNotificationDto,id})
    if(!updateNotification){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.userRepository.save(updateNotification)
  }

  async remove(id: number) {
    const notification=await this.userRepository.findOneBy({id})
    if(!notification){
      throw new NotFoundException("user not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
