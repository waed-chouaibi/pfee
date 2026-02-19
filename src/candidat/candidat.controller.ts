import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { CandidatService } from './candidat.service';
import { CreateCandidatDto } from './dto/create-candidat.dto';
import { UpdateCandidatDto } from './dto/update-candidat.dto';
import { response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import{diskStorage} from 'multer'
@Controller('candidat')
export class CandidatController {
  constructor(private readonly candidatService: CandidatService) {}

  @Post()
  @UseInterceptors(FileInterceptor("imageURL", {
    storage:diskStorage({
      destination: './stockage',
      filename: (req, file, cb) => {
        cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
  }))
  async create(@Body() createCandidatDto: CreateCandidatDto,@Res()response,@UploadedFile() imageURL) {
    try{
       createCandidatDto.imageURL=imageURL? imageURL.filename:null
          const newCandidat=await this.candidatService.create(createCandidatDto)
          return response.status(HttpStatus.CREATED).json({
            message:"user create avec succes",newCandidat
          })
        }catch (error){
          return response.status(HttpStatus.BAD_REQUEST).json({
            statusCode : 400,
            message:"erreur lors de la creation de l'utilisateur"+error.message
          })
        }
  }

  @Get()
  async findAll(@Res() response) {
    try{
      const candidat=await this.candidatService.findAll()
      return response.status(HttpStatus.OK).json({
        message:"this all candidats",candidat
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
      const candidat=await this.candidatService.findOne(id)
      return response.status(HttpStatus.OK).json({
        message:"this user",candidat
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor("imageURL", {
    storage:diskStorage({
      destination: './stockage',
      filename: (req, file, cb) => {
        cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
  }))
  async update(@Param('id') id: number, @Body() updateCandidatDto: UpdateCandidatDto,@Res()response,@UploadedFiles()imageURL) {
    try{
      const newImage=imageURL? imageURL.filename:null
      if(newImage){
        updateCandidatDto.imageURL=newImage
      }
      const updateCandidat=await this.candidatService.update(id ,updateCandidatDto)
      return response.status(HttpStatus.OK).json({
        message:"candidat update",updateCandidat
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur data not found"+error.message
      })

    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number,@Res()response ) {
    try{
      const candidat=await this.candidatService.remove(id)
      return response.status(HttpStatus.OK).json({
        message:"user remove",candidat
      })
    }catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode : 400,
        message:"erreur user not found"+error.message
      })

    }
  }
}
