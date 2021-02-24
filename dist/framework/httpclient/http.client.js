"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.HttpClient = void 0;
const common_1 = require("@nestjs/common");
const request_1 = __importDefault(require("request"));
const restful_service_1 = require("../../conf/restful.service");
let HttpClient = class HttpClient {
    constructor() {
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let a = yield this.createClient(url);
                return a;
            }
            catch (ex) {
                return "a";
            }
        });
    }
    createClient(api, req = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            let restful = restful_service_1.RestfulService[api];
            if (!restful) {
                throw Error("error api:" + api);
            }
            let host = restful_service_1.ServiceHost[restful.Service];
            if (!host) {
                throw Error("error service:" + restful.Service);
            }
            let uri;
            if (!host.endsWith("/") && !restful.URL.endsWith("/")) {
                uri = host + "/" + restful.URL;
            }
            else {
                uri = host + restful.URL;
            }
            let str = "";
            if (typeof (req) === "string") {
                str = req;
            }
            else {
                str = JSON.stringify(req);
            }
            var result = yield new Promise((resolve, reject) => {
                try {
                    request_1.default(uri, {
                        method: "GET",
                        timeout: 5000,
                        headers: {
                            "content-type": "application/json"
                        },
                        body: str
                    }, (err, response, body) => {
                        if (!!err) {
                            reject(err);
                        }
                        else {
                            try {
                                let resp = JSON.parse(body);
                                resolve(resp);
                            }
                            catch (e) {
                                resolve(body);
                            }
                        }
                    });
                }
                catch (ex) {
                    reject({ Result: false, ErrorMessage: "sevice error" });
                }
            });
            return result;
        });
    }
};
HttpClient = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], HttpClient);
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.client.js.map