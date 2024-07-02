import { Controller, Get, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RealIp } from './ip.decorator';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('view')
  viewIP(@RealIp() ip: string): String {
    return `this page is active! ${ip}`
  }

  @Get()
  welcome(): String {
    return `this page is active!`
  }

  @Get('hello')
  getQuery(@Query() query: any, @RealIp() ip: string): Promise<any> {
    const name = query.visitor_name;
    return this.appService.getClient(name, ip);
  }
}
