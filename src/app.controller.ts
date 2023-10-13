import { Controller, Get } from '@nestjs/common';
import 'dotenv/config';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'hello';
  }
}
