
class Resuful {
    Method: "POST" | "GET"
    URL: string
    Service: ServiceType
    NeedLogin: boolean
}


enum ServiceType {
    Album = "Album",
    Admin = "Admin"
}


const ServiceHost: { [key: string]: string } = {
    "Album": "http://localhost:9001/api/",
    "Admin": "http://localhost:9001/api/",
}

const RestfulService: { [key: string]: Resuful } = {
    "ablumListApi": {
        Method: "POST",
        URL: "Manage/GetAlbumList",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "AddAlbumApi": {
        Method: "POST",
        URL: "Manage/AddAlbum",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "getAlbumPicApi": {
        Method: "POST",
        URL: "Manage/GetAlbumPicList",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "rebuildAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAlbumImage",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "deleteAlbumPicApi": {
        Method: "POST",
        URL: "Manage/DeleteAlbumPic",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "loginapi": {
        Method: "POST",
        URL: "Manage/login",
        Service: ServiceType.Album,
        NeedLogin: false
    },
    "uploadImage": {
        Method: "POST",
        URL: "Manage/UploadImage",
        Service: ServiceType.Admin,
        NeedLogin: true
    },
    "uploadImagePartApi":{
        Method: "POST",
        URL: "Manage/UploadImagePart",
        Service: ServiceType.Admin,
        NeedLogin: true
    }
}

export { RestfulService, ServiceHost }

