
class Resuful {
    Method: "POST" | "GET"
    URL: string
    Service: ServiceType
    NeedLogin: boolean
    ServiceOnly: boolean
}


enum ServiceType {
    Album = "Album",
    Admin = "Admin",
    Login="Login"
}


const ServiceHost: { [key: string]: string } = {
    "Album": "http://localhost:9001/api/",
    "Admin": "http://localhost:9001/api/",
    "Login": "http://localhost:9001/api/",
}

const RestfulService: { [key: string]: Resuful } = {
    "ablumListApi": {
        Method: "POST",
        URL: "Manage/GetAlbumList",
        Service: ServiceType.Album,
        NeedLogin: false,
        ServiceOnly: true
    },
    "AddAlbumApi": {
        Method: "POST",
        URL: "Manage/AddAlbum",
        Service: ServiceType.Album,
        NeedLogin: true,
        ServiceOnly: false
    },
    "getAlbumPicApi": {
        Method: "POST",
        URL: "Manage/GetAlbumPicList",
        Service: ServiceType.Album,
        NeedLogin: false,
        ServiceOnly: true
    },
    "rebuildAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAlbumImage",
        Service: ServiceType.Album,
        NeedLogin: true,
        ServiceOnly: false
    },
    "deleteAlbumPicApi": {
        Method: "POST",
        URL: "Manage/DeleteAlbumPic",
        Service: ServiceType.Album,
        NeedLogin: true,
        ServiceOnly: false
    },
    "uploadImage": {
        Method: "POST",
        URL: "Manage/UploadImage",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "uploadImagePartApi": {
        Method: "POST",
        URL: "Manage/UploadImagePart",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "buildAllAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAllAlbum",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "buildAlbumPictureApi": {
        Method: "POST",
        URL: "Manage/BuildPicForAlbum",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "deleteAlbumApi": {
        Method: "POST",
        URL: "Manage/DeleteAlbum",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "getAlbumListByYear": {
        Method: "POST",
        URL: "Manage/GetAlbumListByYear",
        Service: ServiceType.Admin,
        NeedLogin: false,
        ServiceOnly: false
    },
    "buildAllYears": {
        Method: "POST",
        URL: "Manage/BuildAllYears",
        Service: ServiceType.Admin,
        NeedLogin: true,
        ServiceOnly: false
    },
    "getAllYears": {
        Method: "POST",
        URL: "Manage/GetAllYears",
        Service: ServiceType.Admin,
        NeedLogin: false,
        ServiceOnly: true
    },
    "loginApi":{
        Method: "POST",
        URL: "Login/Login",
        Service: ServiceType.Login,
        NeedLogin: false,
        ServiceOnly: true
    },
    "loginAuthApi":{
        Method: "POST",
        URL: "Login/Auth",
        Service: ServiceType.Login,
        NeedLogin: false,
        ServiceOnly: true
    },
    "entryImageApi":{
        Method: "POST",
        URL: "Entry/DeEntry",
        Service: ServiceType.Album,
        NeedLogin: false,
        ServiceOnly: false
    }
}

export { RestfulService, ServiceHost }

