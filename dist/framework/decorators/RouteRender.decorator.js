"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRender = void 0;
const constants_1 = require("@nestjs/common/constants");
const path_1 = require("path");
const constants_2 = __importDefault(require("./constants"));
function RouteRender(page) {
    return (target, temple, describe) => {
        Reflect.defineMetadata(constants_2.default.Route_Name_Metadata, page, describe.value);
        Reflect.defineMetadata(constants_1.RENDER_METADATA, path_1.join("modules/RenderMateData.js"), describe.value);
        return describe;
    };
}
exports.RouteRender = RouteRender;
//# sourceMappingURL=RouteRender.decorator.js.map