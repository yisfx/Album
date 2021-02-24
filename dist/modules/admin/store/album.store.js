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
exports.AlbumReducer = exports.dispatchMiddleWare = exports.AlbumContext = exports.AlbumState = void 0;
const react_1 = __importDefault(require("react"));
class AlbumState {
    constructor() {
        this.a = 0;
    }
}
exports.AlbumState = AlbumState;
exports.AlbumContext = react_1.default.createContext({});
exports.dispatchMiddleWare = (next) => {
    return (action) => __awaiter(void 0, void 0, void 0, function* () {
        switch (action.type) {
            case "init":
                next(action);
                break;
        }
    });
};
function AlbumReducer(state, action) {
    switch (action.type) {
        case "init":
            return Object.assign({}, state);
    }
}
exports.AlbumReducer = AlbumReducer;
//# sourceMappingURL=album.store.js.map