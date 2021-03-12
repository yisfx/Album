import path from "path";
import { SysConfig } from "../../src/conf/site.config";
import { RouteConfig } from "../../src/framework/route.config"
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

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
    output: {
        filename: '[name]-[contenthash:8].js',
        path: path.join(__dirname, "../../dist", SysConfig.JsPath)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash:8].css",
            ignoreOrder: false
        }),
    ],
    mode: "production",
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css', ".png"]
    },
    watch: false,
};

module.exports = config;

export default config