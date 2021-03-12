import { GlobalSetting, SystemConfig } from "../model/SystemConfig"
import crypto from "crypto";
const SysConfig: SystemConfig = {
    port: 9000,

    domain: "http://localhost:9000",
    VisualStaticPath: "/kjsdfh",
    MixPath: "/mix",
    JsPath: "public/script",
    CssPath: "public/css",
    ImagePath: "public/image",

    GlobalConfigPath: "F://FXProject//album//src//conf//global.setting.json",

    AlbumPath: "C://Users//wangs//Desktop//album",
    SHAKey: "wozhidaonaxiexiatianjiuxiangqingchunyiyanghuibulai"
}

function getGlobalConfig(): Partial<GlobalSetting> {

    let globalSetting = global["globalSetting"]

    if (!globalSetting?.SHAIV || !globalSetting?.SHAKEYOrg) {
        console.log("init global setting")
        let setting: GlobalSetting = require(SysConfig.GlobalConfigPath);

        let md5 = crypto.createHash("md5");
        let SHAKey = md5.update(setting.SHAKEYOrg).digest("hex");
        md5 = crypto.createHash("md5");
        let SHAIV = md5.update(setting.SHAIVOrg).digest("hex");
        globalSetting = {
            ...setting,
            SHAIVOrg: "",
            SHAKEYOrg: "",
            SHAKey,
            SHAIV
        }
        global["globalSetting"] = globalSetting
    }

    return {
        ImagePath: globalSetting?.ImagePath,
        SHAKey: globalSetting?.SHAKey,
        SHAIV: globalSetting?.SHAIV
    }
}

const GlobalConfig = getGlobalConfig()


export { SysConfig, GlobalConfig }
