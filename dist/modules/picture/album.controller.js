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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const RouteRender_decorator_1 = require("../../framework/RouteRender.decorator");
const route_config_1 = require("../../framework/route.config");
const http_client_1 = require("../../framework/http.client");
let AlbumController = class AlbumController {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getHello() {
        return __awaiter(this, void 0, void 0, function* () {
            return { initData: { a: "a", b: "b" } };
        });
    }
    Main() {
        return __awaiter(this, void 0, void 0, function* () {
            return { initData: { a: "a", b: "b" } };
        });
    }
};
__decorate([
    common_1.Get(route_config_1.RouteConfig.ALBUM.route),
    RouteRender_decorator_1.RouteRender(route_config_1.RouteConfig.ALBUM.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getHello", null);
__decorate([
    common_1.Get(),
    RouteRender_decorator_1.RouteRender(route_config_1.RouteConfig.ALBUM.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "Main", null);
AlbumController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [http_client_1.HttpClient])
], AlbumController);
exports.AlbumController = AlbumController;
//# sourceMappingURL=album.controller.js.map