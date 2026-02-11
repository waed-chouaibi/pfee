import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { response } from 'express';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async create(@Body() createConversationDto: CreateConversationDto,@Res() response) {
    try{
          const newConversation=await this.conversationService.create(createConversationDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newConversation
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"Error! :("+error.message
          })
        }
  }

  @Get()
  async findAll(@Res() response) {
    try{
      const conversation=await this.conversationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all conversations :)",conversation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"Error! :("+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number , @Res()response) {
     try{
      const conversation=await this.conversationService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",conversation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateConversationDto: UpdateConversationDto , @Res()response) {
    try{
      const conversation=await this.conversationService.update(id ,updateConversationDto)
      return response.status(HttpStatus.OK).json({
        message:"user update",conversation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Delete(':id')
  async remove(@Param('id') id:number , @Res() response) {
    try{
      const conversation=await this.conversationService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",conversation
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
