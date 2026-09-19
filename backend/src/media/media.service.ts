import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllMedia() {
        return this.prisma.media.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async createMedia(data: {
        title: string;
        type: 'AUDIO' | 'VIDEO' ;
        url: string;
        thumbnailUrl?: string;
        category?: string;
    }) {
        return this.prisma.media.create({
            data,
        });
    }
}
