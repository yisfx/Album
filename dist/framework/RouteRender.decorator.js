"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRender = void 0;
const constants_1 = require("@nestjs/common/constants");
const path_1 = require("path");
function RouteRender(page) {
    return (target, temple, describe) => {
        Reflect.defineMetadata("__route__", page, describe.value);
        Reflect.defineMetadata(constants_1.RENDER_METADATA, path_1.join("modules/RenderMateData.js"), describe.value);
        return describe;
    };
}
exports.RouteRender = RouteRender;
//# sourceMappingURL=RouteRender.decorator.js.map