import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getConf(): string {
    return 'Hello World!';
  }
}
