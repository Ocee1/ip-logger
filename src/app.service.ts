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
    this.apiKey = this.configService.get<string>('WEATHER_API');
  }

  async getClient(name: string, ip: string): Promise<any> {
    try {
      const geo = geoip.lookup(ip);
      if (!geo) {
        throw new Error('Invalid IP address');
      }
      
      const weather_data: AxiosResponse<any> = await lastValueFrom(
        this.httpService.get(this.apiUrl, {
          params: {
            q: geo.city,
            appid: this.apiKey,
            units: 'metric'
          },
        }),
      );

      const temp = weather_data.data.main.temp;

      const data = {
        client_ip: ip,
        location: geo.city,
        greeting: `Hello, ${name}! The temperature is ${temp} Celsius in ${geo.city}`,
      };

      return data;
    } catch (error) {

      throw new Error(`Error fetching weather data for IP ${ip}: ${error.message}`);
    }
  }
}
