import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaservice: MediaService) {}

    @Get()
    async getAllMedia() {
        return this.mediaservice.getAllMedia();
    }
}
