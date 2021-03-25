import { Album } from "../../../model/album";


export function BuildMenu(albumList: Album[]): { [key: string]: Album[] } {
    let yearList: { [key: string]: Album[] } = {}
    albumList.map(album => {
        let year = album.Date.split('-')[0]
        if (yearList[year]) {
            yearList[year].push(album);
        } else {
            yearList[year] = [];
            yearList[year].push(album);
        }
    })
    debugger
    return yearList
}