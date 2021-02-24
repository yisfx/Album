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
exports.DefaultController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const http_client_1 = require("../../framework/httpclient/http.client");
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
    staticPng(req, res) {
        let dir = req.url.split("/");
        let f = dir[dir.length - 1];
        res.sendFile(path_1.join(__dirname, '../../', site_config_1.default.ImagePath, f));
    }
    albumJpg(req, res) {
        let dir = req.url.split("/");
        let name = dir[dir.length - 1].split("-");
        let albumName = name[0];
        let picName = name.join("-").replace(`${albumName}-`, "");
        let p = path_1.join(site_config_1.default.AlbumPath, albumName, picName);
        res.sendFile(p);
    }
    staticJpg(req, res) {
        let dir = req.url.split("/");
        let f = dir[dir.length - 1];
        res.sendFile(path_1.join(__dirname, '../../', site_config_1.default.ImagePath, f));
    }
    ajaxPost(req, res, route) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.httpClient.createClient(route, req.body);
            res.send(response);
        });
    }
};
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "/*.js"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "staticFile", null);
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "/*.png"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "staticPng", null);
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "/album/*.jpg"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "albumJpg", null);
__decorate([
    common_1.Get(site_config_1.default.VisualStaticPath + "/*.jpg"),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "staticJpg", null);
__decorate([
    common_1.Post("/ajax/api/:route"),
    __param(0, common_1.Req()), __param(1, common_1.Res()), __param(2, common_1.Param("route")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "ajaxPost", null);
DefaultController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [http_client_1.HttpClient])
], DefaultController);
exports.DefaultController = DefaultController;
//# sourceMappingURL=default.controller.js.map