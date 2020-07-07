import { RouteConfig, Route, PageName } from "./route.config";
import SysConfig from "src/conf/site.config";




export function urlBuilder(page: PageName, para?: {}): string {
    let config: Route = RouteConfig[page];
    let url = SysConfig.domain + config.route

    if (!!para) {
        url += "?"
        for (let key in para) {
            url += key + "&" + para[key]
        }
    }

    return url
}