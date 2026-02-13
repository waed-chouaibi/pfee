import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private userRepository:Repository<Message>
  ){}
  async create(createMessageDto: CreateMessageDto):Promise <Message> {
    const newMessage =await this.userRepository.create(createMessageDto)
    return this.userRepository.save(newMessage)
  }

  async findAll():Promise<Message[]> {
    const message=await this.userRepository.find()
        if(message.length==0){
          throw new NotFoundException("data not found")
        }
        return message
  }

  async findOne(id: number):Promise <Message> {
    const message=await this.userRepository.findOneBy({id})
    if(!message){
      throw new NotFoundException("user not found")
    }
    return message
  }

  async update(id: number, updateMessageDto: UpdateMessageDto):Promise <Message> {
   const updateMessage=await this.userRepository.preload({...updateMessageDto,id})
    if(!updateMessage){
      throw new NotFoundException(`can not update a #${id} user`)
    }
    return this.userRepository.save(updateMessage)
  }

  async remove(id: number) {
    const message=await this.userRepository.findOneBy({id})
    if(!message){
      throw new NotFoundException("user not found")
    }
    await this.userRepository.delete(id)
    return id
  }
}
