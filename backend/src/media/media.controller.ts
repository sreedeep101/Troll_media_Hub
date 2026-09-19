import { Controller, Get ,Post, Body } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaservice: MediaService) {}

    @Get()
    async getAllMedia() {
        return this.mediaservice.getAllMedia();
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

    
}

