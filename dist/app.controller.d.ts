import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    viewIP(ip: string): String;
    welcome(): String;
    getQuery(query: any, ip: string): Promise<any>;
}
