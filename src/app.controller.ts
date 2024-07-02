import { Controller, Get, Ip, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { RealIp } from './ip.decorator';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get()
  welcome(@RealIp() ip: string): String {
    return `This page is active! your IP ${ip}`
  }

  @Get('hello')
  async getQuery(@Query() query: any, @RealIp() ip: string): Promise<any> {

    const name = query.visitor_name;
    const result = await this.appService.getClient(name, ip);
    return result;
  }
}
