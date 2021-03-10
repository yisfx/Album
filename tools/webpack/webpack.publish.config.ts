import path from "path";
import { RouteConfig } from "../../src/framework/route.config"

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