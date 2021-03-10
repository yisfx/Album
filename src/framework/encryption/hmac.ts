import crypto from 'crypto';

const text = '我知道那些夏天就像青春一样回不来,woyebuhuizaiduishuimanhuaiqidai,我知道这个世界每天都有太多遗憾，所以你好,再见';


const algorithm = 'aes-256-gcm';
///md5 我知道那些夏天就像青春一样回不来，
const md5_f = "da1ef87f982f62a8388daaf60672f49c"
const key = Buffer.from(md5_f);
///md5 我也不会再对谁满怀期待
const md5_s = "3e6aaa31df0d97be9e99f8431fe495b9"
const iv = Buffer.from(md5_s);





function Decrypt(txt: string): string {
    let buf: number[] = []
    txt.split("-").map((s: any) => {
        if (s)
            buf.push(s)
    })
    const tag = Buffer.from(buf)
    const cipher = crypto.createCipheriv(algorithm, key, iv); // 初始化加密算法
    let encrypted = cipher.update(txt, 'utf8', 'hex');

    const decipher = crypto.createDecipheriv(algorithm, key, iv); // 初始化解密算法
    decipher.setAuthTag(tag); // 传入验证标签，验证密文的来源
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

function Encrypt(txt: string) {
    // 加密
    const cipher = crypto.createCipheriv(algorithm, key, iv); // 初始化加密算法
    let encrypted = cipher.update(txt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag(); // 生成标签，用于验证密文的来源
    let str = "";
    tag.map((d: number, index: number, array) => {
        str = str + `${d}-`
        return index
    })
    return str
}

export { Decrypt, Encrypt }