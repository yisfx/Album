"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutRender = void 0;
let ass = require("../conf/assets.conf");
function LayoutRender(page) {
    return (target, temple, describe) => {
        Reflect.defineMetadata("__route__", page, describe.value);
        return describe;
    };
}
exports.LayoutRender = LayoutRender;
//# sourceMappingURL=LayoutRender.decorator.js.map