
class Resuful {
    Method: "POST" | "GET"
    URL: string
    Service: ServiceType
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
        Service: ServiceType.Album
    },
    "AddAlbumApi": {
        Method: "POST",
        URL: "Manage/AddAlbum",
        Service: ServiceType.Album
    },
    "getAlbumPicApi": {
        Method: "POST",
        URL: "Manage/GetAlbumPicList",
        Service: ServiceType.Album
    },
    "rebuildAlbumApi": {
        Method: "POST",
        URL: "Manage/BuildAlbumImage",
        Service: ServiceType.Album
    },
    "deleteAlbumPicApi": {
        Method: "POST",
        URL: "Manage/DeleteAlbumPic",
        Service: ServiceType.Album
    },
    "loginapi": {
        Method: "POST",
        URL: "Manage/login",
        Service: ServiceType.Album
    },
    "uploadImage":{
        Method:"POST",
        URL:"Manage/UploadImage",
        Service:ServiceType.Admin
    }
}

export { RestfulService, ServiceHost }

