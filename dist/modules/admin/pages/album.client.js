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
exports.AlbumPage = void 0;
const react_dom_1 = require("react-dom");
const react_1 = __importDefault(require("react"));
const albumList_1 = __importDefault(require("../views/albumList"));
const MobxIsomorphic_1 = require("../../../framework/MobxIsomorphic");
const album_store_1 = require("../store/album.store");
let AlbumPage = class AlbumPage extends react_1.default.Component {
    render() {
        return react_1.default.createElement(albumList_1.default, null);
    }
};
AlbumPage = __decorate([
    MobxIsomorphic_1.MobxIsomorphic(album_store_1.AlbumState)
], AlbumPage);
exports.AlbumPage = AlbumPage;
react_dom_1.render(react_1.default.createElement(AlbumPage, null), document.getElementById("app"));
//# sourceMappingURL=album.client.js.map