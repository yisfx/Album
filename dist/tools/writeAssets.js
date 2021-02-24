"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = exports.publishStatic = exports.WriteAssets = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function WriteAssets() {
    let p = path_1.default.join(__dirname, "../dist/public/");
    let files = fs_1.default.readdirSync(p);
    let ass = {};
    files.map(f => {
        let name = f.split('-')[0];
        ass[name] = f;
    });
    p = path_1.default.join(__dirname, "../dist", "conf");
    if (!fs_1.default.existsSync(p)) {
        fs_1.default.mkdirSync(p);
    }
    fs_1.default.writeFileSync(path_1.default.join(__dirname, "../dist", "conf", "assets.conf.json"), JSON.stringify(ass), { flag: 'w', encoding: 'utf-8', mode: '0666' });
}
exports.WriteAssets = WriteAssets;
function publishStatic() {
}
exports.publishStatic = publishStatic;
function clean(path) {
    let files = [];
    if (fs_1.default.existsSync(path)) {
        files = fs_1.default.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if (fs_1.default.statSync(curPath).isDirectory()) {
                clean(curPath);
            }
            else {
                fs_1.default.unlinkSync(curPath);
            }
        });
        fs_1.default.rmdirSync(path);
    }
}
exports.clean = clean;
//# sourceMappingURL=writeAssets.js.map