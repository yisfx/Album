import path from "path";
import os from 'os';
import { RouteConfig } from "../../src/framework/route.config"
import HappyPack from "happypack";


const config = {
    entry: () => {
        let dic = {}
        for (let route in RouteConfig) {
            let r = RouteConfig[route]
            dic[r.name] = path.join(__dirname, "src", "modules", r.page);
        }
        console.log("webpack entry:", dic);
        return dic;
    },
    mode: "production",
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css', ".png"]
    },
    watch: false,
};

module.exports = config;

export default config