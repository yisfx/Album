"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const MasterPage = (master, props = {}) => (child) => {
    class WrapperComponent extends child {
        render() {
            return react_1.default.createElement(master, Object.assign(Object.assign({}, props), this.props), react_1.default.createElement(child, this.props));
        }
    }
    return WrapperComponent;
};
exports.default = MasterPage;
//# sourceMappingURL=@masterPage.js.map