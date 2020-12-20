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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TianyangSnow = void 0;
const react_1 = __importStar(require("react"));
const imageBuild_1 = require("../../framework/imageBuild");
const area = {
    maxWith: window.screen.width - 150,
    maxHeight: window.screen.height - 100,
    query: decodeURI(window.location.href.split("/")[window.location.href.split("/").length - 1]),
};
const speed = 7000;
function SnowCluster(props) {
    const snow = react_1.default.createRef();
    const [isEnd, setEnd] = react_1.useState(true);
    const [ch, setChar] = react_1.useState("");
    const [w, setW] = react_1.useState(20);
    const bgImg = imageBuild_1.buildImageUrl("image/snow.png");
    const isImage = !(Math.round(props.id) < 5);
    function runCharChange(index = 0) {
        if (index == area.query.length) {
            setChar("");
            return;
        }
        setChar(area.query[index]);
        setTimeout(() => {
            runCharChange(++index);
        }, 1000);
    }
    react_1.useEffect(() => {
        if (!snow)
            return;
        if (!isEnd) {
            return;
        }
        setEnd(false);
        let sp = Math.random() * speed + speed;
        let sX = Math.random() * area.maxWith;
        let eX = Math.random() * area.maxWith;
        eX = eX + (sX - eX) / 3.5;
        let w = Math.random() * (isImage ? 30 : 20) + (isImage ? 0 : 10);
        setW(w);
        let frame = new KeyframeEffect(snow.current, [
            { transform: `translate(${sX}px,-30px)`, rotate: "0deg" },
            { transform: `translate(${eX}px,${area.maxHeight + 10}px)`, rotate: "180deg", opacity: isImage ? .9 : .4 },
        ], {
            duration: sp,
            direction: "normal",
            easing: 'ease-in',
            iterations: Infinity,
        });
        let ani = new Animation(frame, document.timeline);
        ani.play();
    }, [isEnd]);
    if (isImage) {
        return react_1.default.createElement("div", { ref: snow, style: {
                marginTop: "-30px",
                width: `${w}px`,
                height: `${w}px`,
                borderRadius: 50,
                color: "#ffff",
            } },
            react_1.default.createElement("img", { style: {
                    width: `${w}px`,
                    height: `${w}px`,
                }, src: bgImg }));
    }
    else {
        return react_1.default.createElement("div", { ref: snow, style: {
                marginTop: "-30px",
                width: `${w}px`,
                height: `${w}px`,
                borderRadius: 50,
                backgroundColor: "#ffffff",
                textAlign: "center",
                verticalAlign: "center",
                color: "#00FA9A"
            }, onClick: () => runCharChange() },
            react_1.default.createElement("strong", null, ch === null || ch === void 0 ? void 0 : ch.toLocaleUpperCase()));
    }
}
function SnowMaster() {
    const snows = [];
    const [snowList, appendSnowList] = react_1.useState(snows);
    react_1.useEffect(() => {
        setInterval(() => {
            let list = snowList;
            if (snowList.length >= 80) {
                return;
            }
            let id = Math.random() * 80;
            list.push({ id, stop: false });
            appendSnowList([...list]);
        }, 800);
    }, []);
    return react_1.default.createElement("div", { style: {
            height: area.maxHeight,
            backgroundSize: "100%,100%",
            backgroundRepeat: "false",
            backgroundImage: 'url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607959726620&di=729b936481872c4e87b99d1d98b5eb85&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F548e50816a2f9.jpg")'
        } },
        react_1.default.createElement("div", { style: {
                position: "fixed",
                marginTop: area.maxHeight - 86
            } },
            react_1.default.createElement("iframe", { frameBorder: "no", marginWidth: 0, marginHeight: 0, width: "330", height: "86", src: "//music.163.com/outchain/player?type=2&id=443070377&auto=1&height=66" }),
            snowList.length),
        snowList.map(snow => react_1.default.createElement(SnowCluster, { key: snow.id, id: snow.id })));
}
class TianyangSnow extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (react_1.default.createElement(SnowMaster, null));
    }
}
exports.TianyangSnow = TianyangSnow;
function Canvas() {
    return react_1.default.createElement("div", null,
        react_1.default.createElement("div", { id: "content" },
            react_1.default.createElement("div", { "data-index": Math.random(), style: {
                    marginTop: "-30px",
                    width: "20px",
                    height: "20px",
                    borderRadius: 50,
                    backgroundColor: "#ffffff"
                } })));
}
//# sourceMappingURL=tianyang.view.js.map