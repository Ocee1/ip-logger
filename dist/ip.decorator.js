"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealIp = void 0;
const common_1 = require("@nestjs/common");
exports.RealIp = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const forwarded = request.headers['x-forwarded-for'];
    return forwarded ? forwarded.split(',')[0] : request.connection.remoteAddress;
});
//# sourceMappingURL=ip.decorator.js.map