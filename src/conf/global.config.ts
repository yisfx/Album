import { GlobalSetting } from "../model/SystemConfig"
import { SysConfig } from "./site.config";
import crypto from "crypto";


function getGlobalConfig(): Partial<GlobalSetting> {
    if (process.env.BROWSER)
        return null
    let globalSetting = global["globalSetting"]

    if (!globalSetting?.SHAIV || !globalSetting?.SHAKEYOrg) {
        console.log("init global setting")
        let setting: GlobalSetting = require(SysConfig.GlobalConfigPath);

        let md5 = crypto.createHash("md5");
        let SHAKey = md5.update(setting.SHAKEYOrg).digest("hex");
        md5 = crypto.createHash("md5");
        let SHAIV = md5.update(setting.SHAIVOrg).digest("hex");
        globalSetting = {
            AdminPwd: setting?.AdminPwd,
            AlbumPath: setting?.AlbumPath,
            SHAIVOrg: "",
            SHAKEYOrg: "",
            SHAKey,
            SHAIV
        }
        global["globalSetting"] = globalSetting
    }

    return {
        AlbumPath: globalSetting?.AlbumPath,
        SHAKey: globalSetting?.SHAKey,
        SHAIV: globalSetting?.SHAIV
    }
}

const GlobalConfig = getGlobalConfig()


export { GlobalConfig }