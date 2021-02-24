"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const site_config_1 = __importDefault(require("../../conf/site.config"));
let ass = require("../../conf/assets.conf");
const constants_1 = __importDefault(require("../decorators/constants"));
let LayoutInterceptor = class LayoutInterceptor {
    intercept(context, next) {
        const route = Reflect.getMetadata(constants_1.default.Route_Name_Metadata, context.getHandler());
        let content = ass[route];
        if (!content)
            content = ass[404];
        const response = context.switchToHttp().getResponse();
        return next
            .handle()
            .pipe(operators_1.tap(() => {
            if (!!route) {
                response.locals = Object.assign(Object.assign({}, response.locals), { script: site_config_1.default.VisualStaticPath + "/" + content });
            }
        }));
    }
};
LayoutInterceptor = __decorate([
    common_1.Injectable()
], LayoutInterceptor);
exports.LayoutInterceptor = LayoutInterceptor;
//# sourceMappingURL=Layout.Intercept.js.map