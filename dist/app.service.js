"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const geoip = require("geoip-lite");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.apiKey = this.configService.get('WEATHER_API');
    }
    async getClient(name, ip) {
        try {
            const geo = geoip.lookup(ip);
            if (!geo) {
                throw new Error('Invalid IP address');
            }
            const weather_data = await (0, rxjs_1.lastValueFrom)(this.httpService.get(this.apiUrl, {
                params: {
                    q: geo.city,
                    appid: this.apiKey,
                    units: 'metric'
                },
            }));
            const temp = weather_data.data.main.temp;
            const data = {
                client_ip: ip,
                location: geo.city,
                greeting: `Hello, ${name}! The temperature is ${temp} Celsius in ${geo.city}`,
            };
            return data;
        }
        catch (error) {
            throw new Error(`Error fetching weather data for IP ${ip}: ${error.message}`);
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], AppService);
//# sourceMappingURL=app.service.js.map