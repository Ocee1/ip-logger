import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class AppService {
    private readonly httpService;
    private readonly configService;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    getClient(name: string, ip: string): Promise<any>;
}
