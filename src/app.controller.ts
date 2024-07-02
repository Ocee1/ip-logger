import { Controller, Get, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getQuery(@Query() query: any, @Ip() ip: string): Promise<any> {
    const name = query.visitor_name;
    return this.appService.getClient(name, ip);
  }
}
