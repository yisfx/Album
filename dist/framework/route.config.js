"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageNameList = exports.RouteConfig = void 0;
exports.RouteConfig = {
    ALBUM: { name: "album", route: "album", page: "./picture/pages/album.client.tsx" },
    AdminAlbumList: { name: "adminalbum", route: "/admin/album", page: "./admin/pages/album.client.tsx", },
    AdminAlbumPicList: { name: "adminalbumpiclist", route: "/admin/album/:route", page: "./admin/pages/albumpic.client.tsx" }
};
exports.PageNameList = {
    Album: "ALBUM",
    AdminAlbum: "AdminAlbumList",
    AdminAlbumPicList: "AdminAlbumPicList"
};
//# sourceMappingURL=route.config.js.map