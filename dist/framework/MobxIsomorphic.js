"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobxIsomorphic = void 0;
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
function MobxIsomorphic(State) {
    let isomorphicState;
    if (!!State)
        isomorphicState = window.__reactData__;
    else
        isomorphicState = new State();
    let props = { store: mergeMobxState(new State(), isomorphicState) };
    return (Comp) => {
        class IsomorphicComponent extends Comp {
            render() {
                return react_1.default.createElement(mobx_react_1.Provider, props, react_1.default.createElement(Comp, this.props));
            }
        }
        return IsomorphicComponent;
    };
}
exports.MobxIsomorphic = MobxIsomorphic;
function mergeMobxState(target, source) {
    for (var k in source) {
        target[k] = source[k];
    }
    return target;
}
//# sourceMappingURL=MobxIsomorphic.js.map