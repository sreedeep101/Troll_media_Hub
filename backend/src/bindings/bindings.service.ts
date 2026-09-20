import { Injectable, NotFoundException ,ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BindingsService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllBindings() {
        return this.prisma.keyBinding.findMany({
            include: {
                media: true,
            },
        });
    }

    async getBindingsByKey(key: string) {
        const bindings = await this.prisma.keyBinding.findMany({
            where: {
                key: key.toUpperCase(),
            },
            include: {
                media: true,
            },

        });

        if (bindings.length === 0) {
            throw new NotFoundException(`No media found for key ${key}`);
        }

        return bindings;
    }


    async getRandomBinding(key: string) {
        const bindings = await this.getBindingsByKey(key);

        const randomIndex = Math.floor(
            Math.random() * bindings.length,
        );

        return bindings[randomIndex].media;
    }


    async createBinding(key: string, mediaId: string) {
        const existingBinding = await this.prisma.keyBinding.findFirst({
            where: {
                key: key.toUpperCase(),
                mediaId,
            },
        });

        if (existingBinding) {
            throw new ConflictException(
                `This media is already assigned to key ${key.toUpperCase()}`,
            );
        }

        return this.prisma.keyBinding.create({
            data: {
                key: key.toUpperCase(),
                mediaId,
            },
            include: {
                media: true,
            },
        });
    }

    async deleteBinding(id: string) {
        return this.prisma.keyBinding.delete({
            where: { id },
        });
    }
}
