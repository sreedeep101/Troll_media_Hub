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
}
