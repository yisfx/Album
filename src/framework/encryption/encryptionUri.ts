import { PictureUrlLink } from "../../model/album";
import { Decrypt, Encrypt } from "./hmac";


export function BuildImageEncryptionUri(albumName: string, name: string, type: "Max" | "Mini"): string {
    let u: PictureUrlLink = {
        AlbumName: albumName,
        Name: name,
        Type: type,
        DateTime: (new Date()).toString()
    }
    return Encrypt(JSON.stringify(u));
}

export function ParseImageEncryptionUri(u: string): PictureUrlLink {
    try {
        let m: PictureUrlLink = JSON.parse(Decrypt(u));
        if (!m || !m.Name || !m.DateTime || !m.Type || !m.AlbumName)
            return null;
        if (m.Type != "Max" && m.Type != "Mini")
            return null;
        let old = (new Date(m.DateTime)).getDate();
        let n = (new Date()).getDate()
        if (old != n) {
            return null;
        }
        return m;
    } catch {
        return null
    }
}