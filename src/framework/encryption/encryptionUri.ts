import { PictureUrlLink } from "../../model/album";
import { Decrypt, Encrypt } from "./hmac";


export function BuildImageEncryptionUri(albumName: string, name: string, type: "max" | "mini"): string {
    let u: PictureUrlLink = {
        AlbumName: albumName,
        Name: name,
        Type: type,
        DateTime: (new Date()).getDate()
    }
    return Encrypt(JSON.stringify(u));
}

export function ParseImageEncryptionUri(u: string): PictureUrlLink {
    try {
        let m: PictureUrlLink = JSON.parse(Decrypt(u));
        if (!m || !m.Name || !m.DateTime || !m.Type || !m.AlbumName)
            return null;
        if (m.Type != "max" && m.Type != "mini")
            return null;
        let old = m.DateTime;
        let n = (new Date()).getDate()
        if (old != n) {
            return null;
        }
        return m;
    } catch {
        return null
    }
}