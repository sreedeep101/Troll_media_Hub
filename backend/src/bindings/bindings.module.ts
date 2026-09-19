import { Module } from '@nestjs/common';
import { BindingsController } from './bindings.controller';
import { BindingsService } from './bindings.service';

@Module({
  controllers: [BindingsController],
  providers: [BindingsService]
})
export class BindingsModule {}
