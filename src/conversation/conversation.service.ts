import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation) private conversationRepository:Repository<Conversation>
  ){}
  async create(createConversationDto: CreateConversationDto): Promise <Conversation> {
    const newConversation =await this.conversationRepository.create(createConversationDto)
    return this.conversationRepository.save(newConversation)
  }

  async findAll():Promise <Conversation[]> {
    const conversation=await this.conversationRepository.find()
        if(conversation.length==0){
          throw new NotFoundException("data not found")
        }
        return conversation
  }

  async findOne(id: number):Promise<Conversation> {
    const conversation=await this.conversationRepository.findOneBy({id})
  if(!conversation){
    throw new NotFoundException("Error: not found")
  }
  return conversation
  }

  async update(id: number, updateConversationDto: UpdateConversationDto):Promise <Conversation> {
    const updateConversation=await this.conversationRepository.preload({...updateConversationDto,id})
  if(!updateConversation){
    throw new NotFoundException(`can not update a #${id} user`)
  }
  return this.conversationRepository.save(updateConversation)
    
  }

  async remove(id: number) {
     const conversation=await this.conversationRepository.findOneBy({id})
  if(!conversation){
    throw new NotFoundException("user not found")
  }
  await this.conversationRepository.delete(id)
  return id
  }
}
