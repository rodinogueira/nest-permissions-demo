import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // “feat: create the worst conflict humanity has ever witnessed”
  @Get()
  getConflictTerr(): string { // comment
    console.log('Hello World!');
    return this.appService.getConf();
  }
}
