"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceHost = exports.RestfulService = void 0;
class Resuful {
}
var ServiceType;
(function (ServiceType) {
    ServiceType["Album"] = "Album";
})(ServiceType || (ServiceType = {}));
const ServiceHost = {
    "Album": "http://localhost:9001/",
};
exports.ServiceHost = ServiceHost;
const RestfulService = {
    "ablumListApi": {
        Method: "POST",
        URL: "Manage/AlbumList",
        Service: ServiceType.Album
    },
    "AddAlbumApi": {
        Method: "POST",
        URL: "Manage/AddAlbum",
        Service: ServiceType.Album
    },
    "getAlbumPicApi": {
        Method: "POST",
        URL: "Manage/GetAlbum",
        Service: ServiceType.Album
    },
    "rebuildAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAlbumImage",
        Service: ServiceType.Album
    }
};
exports.RestfulService = RestfulService;
//# sourceMappingURL=restful.service.js.map