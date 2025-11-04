import { Module } from '@nestjs/common';
import { AmbService } from './amb/amb.service';
import { AmbController } from './amb/amb.controller';

@Module({
  providers: [AmbService],
  controllers: [AmbController]
})
export class AmbModule {}
