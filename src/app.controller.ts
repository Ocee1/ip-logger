import { Controller, Get, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('view')
  viewIP(@Ip() ip: string): String {
    return `this page is active! ${ip}`
  }

  @Get()
  welcome(): String {
    return `this page is active!`
  }

  @Get('live')
  getQuery(@Query() query: any, @Ip() ip: string): Promise<any> {
    const name = query.visitor_name;
    return this.appService.getClient(name, ip);
  }
}
