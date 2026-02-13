import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { response } from 'express';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto,@Res()response) {
    try{
          const newNotification=await this.notificationService.create(createNotificationDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newNotification
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
      const notification=await this.notificationService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all notification",notification
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
      const notification=await this.notificationService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this notification",notification
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateNotificationDto: UpdateNotificationDto,@Res()response) {
    try{
      const notification=await this.notificationService.update(id ,updateNotificationDto)
      return response.status(HttpStatus.OK).json({
        message:"notification update",notification
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
      const notification=await this.notificationService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",notification
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
