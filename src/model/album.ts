///相册
export interface Album {
    Name: string
    Cover: string
    Date: string
    Path: string
    PicList: Picture[]
    ///根据album name寻path
}

///图片
export interface Picture {
    Name: string
    MiniPath: string
    MaxPath: string
    OrgPath: string
    Album: string
}