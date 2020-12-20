"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildImageUrl = void 0;
const site_config_1 = __importDefault(require("../conf/site.config"));
function buildImageUrl(name) {
    return `${site_config_1.default.VisualStaticPath}/${name}`;
}
exports.buildImageUrl = buildImageUrl;
//# sourceMappingURL=imageBuild.js.map