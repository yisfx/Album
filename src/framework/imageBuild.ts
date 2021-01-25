import SysConfig from "../conf/site.config";


export function buildImageUrl(name: string) {
    return `${SysConfig.VisualStaticPath}/${name}`;
}

export function BuildAlbumImageUrl(name: string) {
    return `${SysConfig.VisualStaticPath}/album/${name}`;
}