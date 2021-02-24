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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ajax = void 0;
function Ajax(api, request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let resp = yield fetch("/ajax/api/" + api, {
                body: JSON.stringify(request),
                cache: 'no-cache',
                credentials: 'include',
                headers: {
                    'user-agent': 'Mozilla/4.0 MDN Example',
                    'content-type': 'application/json',
                    "accept": "application/json; charset=utf-8"
                },
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                referrer: 'no-referrer'
            });
            return yield new Promise((resolve, reject) => {
                if (resp.ok) {
                    resolve(resp.json());
                }
                else {
                    reject(resp.json());
                }
            });
        }
        catch (ex) {
            return { Result: false, ErrorMessage: ex };
        }
    });
}
exports.Ajax = Ajax;
//# sourceMappingURL=ajax.js.map