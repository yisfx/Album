"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const album_store_1 = require("../store/album.store");
const adminMaster_1 = __importDefault(require("../../../framework/Master/adminMaster"));
const _masterPage_1 = __importDefault(require("../../../framework/Master/@masterPage"));
const modal_1 = require("../../../framework/components/modal");
const ajax_1 = require("../../../framework/httpclient/ajax");
const FXImage_1 = require("../../../framework/components/FXImage");
const urlBuilder_1 = require("../../../framework/urlBuilder");
const route_config_1 = require("../../../framework/route.config");
function EditAlbumPopu(props) {
    const [album, setAlbum] = react_1.useState(props.album || {});
    const [errorMessage, setErrorMsg] = react_1.useState("");
    const submit = () => {
        if (!album.Name || !album.Date || !album.Description)
            return;
        let request = album;
        ajax_1.Ajax("AddAlbumApi", request).then((resp) => {
            if (resp.Result) {
                window.location.reload();
            }
            else {
                setErrorMsg(resp.ErrorMessage);
            }
        });
    };
    return react_1.default.createElement("form", null,
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", null, "Name"),
                react_1.default.createElement("input", { type: "text", className: "form-control", placeholder: "Name", readOnly: !!props.album, value: album.Name, onChange: (evt) => { var _a; setAlbum(Object.assign(Object.assign({}, album), { Name: ((_a = evt.target) === null || _a === void 0 ? void 0 : _a.value) || "" })); } })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", null, "DateTime"),
                react_1.default.createElement("input", { type: "date", className: "form-control", placeholder: "DateTime", readOnly: !!props.album, value: album.Date, onChange: (evt) => {
                        var _a;
                        setAlbum(Object.assign(Object.assign({}, album), { Date: ((_a = evt.target) === null || _a === void 0 ? void 0 : _a.value) || "" }));
                    } })),
            react_1.default.createElement("div", { className: "form-group" },
                react_1.default.createElement("label", null, "Description"),
                react_1.default.createElement("textarea", { className: "form-control", placeholder: "Description", value: album.Description, onChange: (evt) => {
                        var _a;
                        setAlbum(Object.assign(Object.assign({}, album), { Description: ((_a = evt.target) === null || _a === void 0 ? void 0 : _a.value) || "" }));
                    } })),
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-lg-10" }),
                react_1.default.createElement("div", { className: "col-lg-2" },
                    react_1.default.createElement("button", { type: "button", className: "btn btn-primary", onClick: submit }, "Submit"))),
            errorMessage &&
                react_1.default.createElement("div", { className: "alert alert-danger", role: "alert" }, errorMessage)));
}
function Top() {
    var _a;
    const { state, dispatcher } = react_1.useContext(album_store_1.AlbumContext);
    const [isOpen, setIsOpen] = react_1.useState(false);
    const [name, setName] = react_1.useState("");
    const [dateTime, setDateTime] = react_1.useState("");
    const [description, setDescription] = react_1.useState("");
    const clearData = () => {
        setName("");
        setDateTime("");
        setDescription("");
        setErrorMsg("");
    };
    const [errorMessage, setErrorMsg] = react_1.useState("");
    return react_1.default.createElement("div", { className: "row" },
        react_1.default.createElement("div", { style: { marginTop: "100px" } }),
        react_1.default.createElement("div", { className: "col-md-8" },
            react_1.default.createElement("div", { className: "page-header" },
                react_1.default.createElement("h3", null,
                    "Current Album Count(", (_a = state.AlbumList) === null || _a === void 0 ? void 0 :
                    _a.length,
                    ")"))),
        react_1.default.createElement("div", { className: "col-md-2" },
            react_1.default.createElement("button", { type: "button", className: "btn btn-info", onClick: () => {
                    clearData();
                    setIsOpen(true);
                } }, "Create Album")),
        isOpen &&
            react_1.default.createElement(modal_1.FxModal, { isOpen: isOpen, close: () => {
                    setIsOpen(false);
                } },
                react_1.default.createElement(EditAlbumPopu, { album: undefined })));
}
function AlbumContent(prop) {
    const [isOpen, setOpen] = react_1.useState(false);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "row list-group-item", style: { height: "120px", } },
            react_1.default.createElement("div", { className: "col-lg-2" },
                react_1.default.createElement(FXImage_1.FXImage, { style: { width: "100px", height: "100px" }, name: prop.album.Cover, type: FXImage_1.ImageType.Album, desc: undefined })),
            react_1.default.createElement("div", { className: "col-lg-8", onClick: () => {
                    window.location.href = urlBuilder_1.urlBuilder(route_config_1.PageNameList.AdminAlbumPicList, prop.album.Name);
                } },
                react_1.default.createElement("div", null,
                    "Name:",
                    prop.album.Name),
                react_1.default.createElement("div", null,
                    "Date:",
                    prop.album.Date),
                react_1.default.createElement("div", null,
                    "Description:",
                    prop.album.Description)),
            react_1.default.createElement("div", { className: "col-lg-2" }),
            react_1.default.createElement("button", { type: "button", className: "btn btn-info", onClick: (evt) => {
                    setOpen(true);
                } }, "Edit")),
        isOpen &&
            react_1.default.createElement(modal_1.FxModal, { isOpen: isOpen, close: () => {
                    setOpen(false);
                } },
                react_1.default.createElement(EditAlbumPopu, { album: prop.album })));
}
function List() {
    var _a;
    const { state, dispatcher } = react_1.useContext(album_store_1.AlbumContext);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "list-group" }, (_a = state.AlbumList) === null || _a === void 0 ? void 0 : _a.map((a, index) => react_1.default.createElement(AlbumContent, { key: `${a.Name}_${index}`, album: a }))));
}
function Content(initalState) {
    const [state, dispatch] = react_1.useReducer(album_store_1.AlbumReducer, initalState);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(album_store_1.AlbumContext.Provider, { value: { state, dispatcher: album_store_1.dispatchMiddleWare(dispatch) } },
            react_1.default.createElement(Top, null),
            react_1.default.createElement(List, null)));
}
let AlbumListPage = class AlbumListPage extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(Content, Object.assign({}, this.props)));
    }
};
AlbumListPage = __decorate([
    _masterPage_1.default(adminMaster_1.default),
    __metadata("design:paramtypes", [Object])
], AlbumListPage);
exports.default = AlbumListPage;
//# sourceMappingURL=albumList.js.map