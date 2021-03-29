

export interface SystemConfig {
    port: number,
    domain: string,
    VisualStaticPath: string,
    MixPath: string,
    JsPath: string,
    CssPath: string,
    GlobalConfigPath: string
    ImagePath: string,
}

export interface GlobalSetting {
    AdminPwd: string[],
    AlbumPath: string,
    SHAKEYOrg: string,
    SHAIVOrg: string,
    SHAKey: string,
    SHAIV: string
}

