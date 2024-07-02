import { HttpService } from '@nestjs/axios';
import { Injectable, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
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
      const response = await axios.get(`https://freegeoip.app/json/${ip}`);
      const geoData = response.data;
      
    

      if (!geoData) {
        throw new Error('Invalid IP address');
      }
      
      const weather_data: AxiosResponse<any> = await lastValueFrom(
        this.httpService.get(this.apiUrl, {
          params: {
            q: geoData.city,
            appid: this.apiKey,
            units: 'metric'
          },
        }),
      );

      const temp = weather_data.data.main.temp;

      const data = {
        client_ip: ip,
        location: geoData.city,
        greeting: `Hello, ${name}! The temperature is ${temp} Celsius in ${geoData.city}`,
      };

      return data;
    } catch (error) {

      throw new Error(`Error fetching weather data for IP ${ip}: ${error.message}`);
    }
  }
}
