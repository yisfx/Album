"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const Layout_Intercept_1 = require("./framework/interceptor/Layout.Intercept");
const ReactView_1 = __importDefault(require("./framework/ReactView"));
const site_config_1 = __importDefault(require("./conf/site.config"));
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalInterceptors(new Layout_Intercept_1.LayoutInterceptor());
        app.useStaticAssets(path_1.join(__dirname), {
            prefix: site_config_1.default.VisualStaticPath
        });
        app.set('views', path_1.join(__dirname));
        app.set('view engine', 'js');
        app.engine('js', ReactView_1.default);
        yield app.listen(site_config_1.default.port);
        console.log("listen at", site_config_1.default.port);
    });
}
bootstrap();
//# sourceMappingURL=server.js.map