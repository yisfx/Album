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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const RouteRender_decorator_1 = require("../../framework/decorators/RouteRender.decorator");
const route_config_1 = require("../../framework/route.config");
const http_client_1 = require("../../framework/httpclient/http.client");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const path_1 = require("path");
let AdminController = class AdminController {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    Album() {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield this.httpClient.createClient("ablumListApi");
            return {
                initData: Object.assign({}, resp)
            };
        });
    }
    AlbumPicList(route) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = { AlbumName: route };
            let resp = yield this.httpClient.createClient("getAlbumPicApi", request);
            resp.Album.PicList.map(d => { d.MaxPath = d.MiniPath = d.OrgPath = undefined; });
            return { initData: Object.assign({}, resp) };
        });
    }
    PictureUpload(response, files, body) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let request = { AlbumName: body["AlbumName"] };
            let album = yield this.httpClient.createClient("getAlbumPicApi", request);
            if ((_b = (_a = album.Album) === null || _a === void 0 ? void 0 : _a.PicList) === null || _b === void 0 ? void 0 : _b.find((p) => p.Name === files[0].originalname)) {
                response.send({ Result: false, ErrorMessage: "Exists Picture" });
            }
            let file = files[0];
            let name = file.originalname.split(".");
            let fileName = album.Album.Name + "-" + name[0] + "-org." + name[1];
            let stream = fs_1.createWriteStream(path_1.join(album.Album.Path, fileName));
            stream.write(file.buffer);
            stream.close();
            response.send({ Result: true });
        });
    }
};
__decorate([
    common_1.Get(route_config_1.RouteConfig.AdminAlbumList.route),
    RouteRender_decorator_1.RouteRender(route_config_1.RouteConfig.AdminAlbumList.name),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "Album", null);
__decorate([
    common_1.Get(route_config_1.RouteConfig.AdminAlbumPicList.route),
    RouteRender_decorator_1.RouteRender(route_config_1.RouteConfig.AdminAlbumPicList.name),
    __param(0, common_1.Param("route")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "AlbumPicList", null);
__decorate([
    common_1.Post("PictureUploadApi"),
    common_1.UseInterceptors(platform_express_1.FilesInterceptor("files", 1)),
    __param(0, common_1.Res()), __param(1, common_1.UploadedFile("files")), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "PictureUpload", null);
AdminController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [http_client_1.HttpClient])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map