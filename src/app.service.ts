import { HttpService } from '@nestjs/axios';
import { Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import * as geoip from 'geoip-lite';
import { lastValueFrom } from 'rxjs';


@Injectable()
export class AppService {
  private readonly apiKey: string;
  private readonly apiUrl: string = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(
    private readonly httpService: HttpService, 
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API')
  }


  async getClient(name: string, ip: string): Promise<any> {
    const geo = geoip.lookup(ip);
    const weather_data: AxiosResponse<any> = await lastValueFrom(
      this.httpService.get(this.apiUrl, {
        params: {
          q: geo.city,
          appid: this.apiKey,
        },
    }),
  );

    const temp = weather_data.data.main.temp

    const data = {
      client_ip: ip,
      location: geo.city,
      greeting: `Hello, ${name}!, the temperature is ${temp} celcius in ${geo.city}`
    }
    return data;
  }
}
