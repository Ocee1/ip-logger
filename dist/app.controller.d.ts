import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    welcome(ip: string): String;
    getQuery(query: any, ip: string): Promise<any>;
}
