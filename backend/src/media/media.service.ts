import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MediaService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllMedia() {
        return this.prisma.media.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async getVideos() {
        return this.prisma.media.findMany({
            where: {
                type: 'VIDEO',
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async createMedia(data: {
        title: string;
        type: 'AUDIO' | 'VIDEO';
        url: string;
        thumbnailUrl?: string;
        category?: string;
    }) {
        return this.prisma.media.create({
            data,
        });
    }

    async createUploadedMedia(
        file: Express.Multer.File,
        data: {
            title: string;
            type: 'AUDIO' | 'VIDEO';
            category?: string;
        },
    ) {
        const url = `/uploads/${file.filename}`;

        return this.prisma.media.create({
            data: {
                title: data.title,
                type: data.type,
                url,
                category: data.category,
            },
        });
    }

    async deleteMedia(id: string) {
        const media = await this.prisma.media.findUnique({
            where: { id },
        });

        if (!media) {
            throw new NotFoundException('Media not found');
        }

        // Delete physical file if it is a local upload
        if (media.url.startsWith('/uploads/')) {
            const filename = media.url.replace('/uploads/', '');
            const filePath = join(process.cwd(), 'uploads', filename);

            try {
                await unlink(filePath);
                console.log('Deleted file:', filePath);
            } catch (error) {
                console.warn('Could not delete physical file:', filePath);
            }
        }

        // Delete database record
        return this.prisma.media.delete({
            where: { id },
        });
    }
}
