"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNameList = exports.RouteConfig = void 0;
exports.RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbum: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    TianYang: { name: "tianyang", route: "/tianyang", page: "./gift/tianyang.client.tsx" },
    MC: { name: "snow", route: "/mc", page: "./gift/tianyang.client.tsx" }
};
exports.PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbum"
};
//# sourceMappingURL=route.config.js.map