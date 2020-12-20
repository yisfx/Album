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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const http_client_1 = require("../../framework/http.client");
const site_config_1 = __importDefault(require("../../conf/site.config"));
let DefaultController = class DefaultController {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    staticFile(req, res) {
        let dir = req.url.split("/");
        let f = dir[dir.length - 1];
        res.sendFile(path_1.join(__dirname, '../../', site_config_1.default.JsPath, f));
    }
    staticImage(req, res) {
        let dir = req.url.split("/");
        let f = dir[dir.length - 1];
        res.sendFile(path_1.join(__dirname, '../../', site_config_1.default.ImagePath, f));
    }
    ajax(req, res) {
        this.httpClient.get(req.url.replace("ajax/api", ""));
        return { Result: "Success" };
    }
};
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "*.js"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], DefaultController.prototype, "staticFile", null);
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "*.png"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], DefaultController.prototype, "staticImage", null);
__decorate([
    common_1.Post("/ajax/Api*"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Object)
], DefaultController.prototype, "ajax", null);
DefaultController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [http_client_1.HttpClient])
], DefaultController);
exports.DefaultController = DefaultController;
//# sourceMappingURL=default.controller.js.map