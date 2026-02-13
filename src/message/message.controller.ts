import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { response } from 'express';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto,@Res()response) {
    try{
          const newMessage=await this.messageService.create(createMessageDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newMessage
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de l'utilisateur"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res()response) {
    try{
      const messagee=await this.messageService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all messages",messagee
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })
      
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number,@Res()response) {
    try{
      const messagee=await this.messageService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",messagee
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto,@Res()response) {
    try{
      const messagee=await this.messageService.update(id ,updateMessageDto)
      return response.status(HttpStatus.OK).json({
        message:"message update",messagee
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res()response) {
    try{
      const messagee=await this.messageService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",messagee
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
