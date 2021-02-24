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
const _masterPage_1 = __importDefault(require(".././../../framework/Master/@masterPage"));
const adminMaster_1 = __importDefault(require("../../../framework/Master/adminMaster"));
const albumPicList_store_1 = require("../store/albumPicList.store");
const modal_1 = require("../../../framework/components/modal");
const urlBuilder_1 = require("../../../framework/urlBuilder");
const route_config_1 = require("../../../framework/route.config");
const upload_1 = require("../../../framework/components/upload");
const fxImage_1 = require("../../../framework/components/fxImage");
const ajax_1 = require("../../../framework/httpclient/ajax");
var DeleteType;
(function (DeleteType) {
    DeleteType["Image"] = "Image";
    DeleteType["Abbreviation"] = "Abbreviation";
})(DeleteType || (DeleteType = {}));
function Pic(props) {
    const [deleteConfirmModal, setDeleteConfirmModal] = react_1.useState({ show: false, deleteType: DeleteType.Abbreviation });
    const DeleteImage = () => {
        ajax_1.Ajax("", {});
    };
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "col-xs-2" },
                react_1.default.createElement("div", { className: "thumbnail" },
                    react_1.default.createElement(fxImage_1.FXImage, { style: { width: "200px", height: "200px", objectFit: "contain" }, name: `${props.p.Album}-${props.p.Name}-mini.jpg`, type: fxImage_1.ImageType.Album, desc: undefined }))),
            react_1.default.createElement("div", { className: "col-xs-4" }, props.p.Name),
            react_1.default.createElement("div", { className: "col-xs-4" },
                react_1.default.createElement("button", { onClick: () => {
                        setDeleteConfirmModal({ show: true, deleteType: DeleteType.Image });
                    }, className: "btn" }, "delete image"),
                react_1.default.createElement("br", null),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { onClick: () => {
                        setDeleteConfirmModal({ show: true, deleteType: DeleteType.Abbreviation });
                    }, className: "btn" }, "delete max & mini"))),
        react_1.default.createElement(modal_1.FxModal, { isOpen: deleteConfirmModal.show, close: () => { setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation }); } },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-sm-2" }),
                " ",
                react_1.default.createElement("div", null,
                    "are you sure delete this ",
                    deleteConfirmModal.deleteType,
                    "\uFF1F")),
            react_1.default.createElement("div", { className: "thumbnail" },
                react_1.default.createElement(fxImage_1.FXImage, { style: { height: "250px", objectFit: "contain" }, name: `${props.p.Album}-${props.p.Name}-mini.jpg`, type: fxImage_1.ImageType.Album, desc: undefined })),
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-sm-2" }),
                react_1.default.createElement("div", { className: "col-sm-2" },
                    react_1.default.createElement("button", null, " SURE ")),
                react_1.default.createElement("div", { className: "col-sm-2" }),
                react_1.default.createElement("div", { className: "col-sm-2" }),
                react_1.default.createElement("div", { className: "col-sm-2" },
                    react_1.default.createElement("button", { onClick: () => {
                            setDeleteConfirmModal({ show: false, deleteType: DeleteType.Abbreviation });
                        } }, " NO ")))));
}
function List() {
    var _a, _b;
    const { state, dispatcher } = react_1.useContext(albumPicList_store_1.AlbumPicListContext);
    return react_1.default.createElement("div", null, (_b = (_a = state.Album) === null || _a === void 0 ? void 0 : _a.PicList) === null || _b === void 0 ? void 0 : _b.map(p => react_1.default.createElement("div", { key: p.Name },
        react_1.default.createElement(Pic, { p: p }))));
}
function Top() {
    var _a, _b;
    const { state, dispatcher } = react_1.useContext(albumPicList_store_1.AlbumPicListContext);
    const [openModal, setOpenModal] = react_1.useState(false);
    const [file, setFile] = react_1.useState(null);
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", { className: "row" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-md-8" },
                    react_1.default.createElement("div", { className: "page-header" },
                        react_1.default.createElement("h1", null,
                            state.Album.Name,
                            " ",
                            react_1.default.createElement("small", null,
                                "picture count(",
                                ((_b = (_a = state.Album) === null || _a === void 0 ? void 0 : _a.PicList) === null || _b === void 0 ? void 0 : _b.length) || 0,
                                ")")))),
                react_1.default.createElement("div", { className: "col-md-4" },
                    react_1.default.createElement("div", { className: "page-header" },
                        react_1.default.createElement("button", { className: "btn btn-default", type: "submit", onClick: () => {
                                window.location.href = urlBuilder_1.urlBuilder(route_config_1.PageNameList.AdminAlbum);
                            } }, "Back"),
                        "\u00A0\u00A0\u00A0",
                        react_1.default.createElement("button", { className: "btn btn-default", type: "submit", onClick: () => { setOpenModal(true); } }, "Upload Picture"),
                        "\u00A0\u00A0\u00A0",
                        react_1.default.createElement("button", { className: "btn btn-default", type: "submit", onClick: () => {
                                ajax_1.Ajax("rebuildAlbumApi", { AlbumName: state.Album.Name }).then(resp => {
                                    if (resp === null || resp === void 0 ? void 0 : resp.Result)
                                        alert("done");
                                });
                            } }, "Rebuild"))))),
        react_1.default.createElement(modal_1.FxModal, { isOpen: openModal, close: () => { setOpenModal(false); } },
            react_1.default.createElement("div", null,
                react_1.default.createElement(upload_1.Upload, { UploadUrl: "/PictureUploadApi", Success: (response) => {
                        if (response.Result) {
                            window.location.reload();
                        }
                    } },
                    react_1.default.createElement("input", { type: "text", readOnly: true, hidden: true, name: "AlbumName", value: state.Album.Name }),
                    react_1.default.createElement("input", { type: "file", name: "files", onChange: (evt) => {
                            setFile(evt.target.value);
                        } })))));
}
function Content(initalState) {
    const [state, dispatch] = react_1.useReducer(albumPicList_store_1.AlbumPicListReducer, initalState);
    return react_1.default.createElement(albumPicList_store_1.AlbumPicListContext.Provider, { value: { state, dispatcher: albumPicList_store_1.dispatchMiddleWare(dispatch) } },
        react_1.default.createElement(Top, null),
        react_1.default.createElement(List, null));
}
let AlbumPicList = class AlbumPicList extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return react_1.default.createElement(Content, Object.assign({}, this.props));
    }
};
AlbumPicList = __decorate([
    _masterPage_1.default(adminMaster_1.default),
    __metadata("design:paramtypes", [Object])
], AlbumPicList);
exports.default = AlbumPicList;
//# sourceMappingURL=albumPicList.js.map