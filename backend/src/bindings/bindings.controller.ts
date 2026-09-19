import { Controller,Get, Param, Post ,Body} from '@nestjs/common';
import { BindingsService } from './bindings.service';

@Controller('bindings')
export class BindingsController {
    constructor(private readonly bindingsService: BindingsService) {}

    @Get()
    async getBindings() {
        return this.bindingsService.getAllBindings();
    }

    @Get(':key/random')
    async getRandomBinding(@Param('key') key: string) {
        return this.bindingsService.getRandomBinding(key);
    }

    @Get(':key')
    async getBindingsByKey(@Param('key') key: string) {
        return this.bindingsService.getBindingsByKey(key);
    }

    @Post()
    createBinding(@Body() data: {key: string; mediaId: string;}){
        return this.bindingsService.createBinding(
            data.key,
            data.mediaId,
        );
    }
    
}
