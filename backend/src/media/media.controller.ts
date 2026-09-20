import { Controller, Get ,Post,Delete,Param, Body, UploadedFile,UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaservice: MediaService) {}

    @Get()
    async getAllMedia() {
        return this.mediaservice.getAllMedia();
    }

    @Get('videos')
    getvideos() {
        return this.mediaservice.getVideos();
    }

    @Post()
    async createMedia(@Body() data: {
        title: string;
        type: 'AUDIO' | 'VIDEO';
        url: string;
        thumbnailUrl?: string;
        category?: string;
    }) {
        return this.mediaservice.createMedia(data);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;

                callback(null, uniqueName);
            },
        }),
    }),)
    uploadMedia(
        @UploadedFile() file: Express.Multer.File,
        @Body() data: {
            title: string;
            type: 'AUDIO' | 'VIDEO';
            category?: string;
        },
    ) {
        return this.mediaservice.createUploadedMedia(file, data);
    }

    @Delete(':id')
    deleteMedia(@Param('id') id:string){
        return this.mediaservice.deleteMedia(id);
    }

    
}

