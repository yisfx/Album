import crypto from 'crypto';
import { GlobalConfig } from '../../conf/global.config';

const text = '我知道那些夏天就像青春一样回不来,woyebuhuizaiduishuimanhuaiqidai,我知道这个世界每天都有太多遗憾，所以你好,再见';


const algorithm = 'aes-256-gcm';
const key = Buffer.from(GlobalConfig.SHAKey);
const iv = Buffer.from(GlobalConfig.SHAIV);



function Decrypt(txt: string): string {
    const decipher = crypto.createDecipheriv(algorithm, key, iv); // 初始化解密算法
    var ss = decipher.update(txt, "hex", "utf8")
    return ss

}

function Encrypt(txt: string) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(txt, "utf8", 'hex');
    return encrypted;

}

function Demo() {
    let ssss = Encrypt(text)
    console.log("Encrypt:", ssss, ssss.length)
    console.log("Decrypt:", Decrypt(ssss))
}

export { Decrypt, Encrypt, Demo }
