"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlBuilder = void 0;
const route_config_1 = require("./route.config");
const site_config_1 = __importDefault(require("../conf/site.config"));
function urlBuilder(page, para) {
    let config = route_config_1.RouteConfig[page];
    let url = site_config_1.default.domain + config.route;
    if (!!para) {
        url += "?";
        for (let key in para) {
            url += key + "&" + para[key];
        }
    }
    return url;
}
exports.urlBuilder = urlBuilder;
//# sourceMappingURL=urlBuilder.js.map