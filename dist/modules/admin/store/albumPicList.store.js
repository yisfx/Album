"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumPicListReducer = exports.dispatchMiddleWare = exports.AlbumPicListContext = exports.AlbumPicListState = void 0;
const react_1 = __importDefault(require("react"));
class AlbumPicListState {
}
exports.AlbumPicListState = AlbumPicListState;
exports.AlbumPicListContext = react_1.default.createContext(undefined);
function dispatchMiddleWare(next) {
    return (action) => __awaiter(this, void 0, void 0, function* () {
        switch (action.type) {
            case "init":
                next(action);
                break;
            case "update":
                next(action);
                break;
            default: return next(action);
        }
    });
}
exports.dispatchMiddleWare = dispatchMiddleWare;
function AlbumPicListReducer(state, action) {
    switch (action.type) {
        case "init":
            return state;
        case "update":
            return Object.assign(Object.assign({}, state), action.state);
    }
}
exports.AlbumPicListReducer = AlbumPicListReducer;
//# sourceMappingURL=albumPicList.store.js.map