import jsSHA from "jssha";
import SysConfig from "../../conf/site.config";


function Encryption(text: string): string {
    const shaObj = new jsSHA("SHA-512", "TEXT", {
        hmacKey: { value: SysConfig.SHAKey, format: "TEXT" },
    });
    shaObj.update(text);
    return shaObj.getHash("HEX");
}

function DeCrypt(text: string) {
    const shaObj = new jsSHA("SHA-512", "TEXT", {
        hmacKey: { value: SysConfig.SHAKey, format: "TEXT" },
    });
}

export default {
    Encryption, DeCrypt
}