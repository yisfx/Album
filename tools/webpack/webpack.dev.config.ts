import path from "path";
import { smart } from 'webpack-merge';
import { RouteConfig } from "../../src/framework/route.config";
import { SysConfig } from "../../src/conf/site.config";
import { deleteFiles } from "../fileTool";
import CommonConfig from "./webpack.common";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = smart(CommonConfig, {
    entry: () => {
        let dic = {}
        deleteFiles(path.join(__dirname, "../../dist", SysConfig.JsPath))
        for (let route in RouteConfig) {
            let r = RouteConfig[route]
            dic[r.name] = path.join(__dirname, "../../", "src", "modules", r.page);
        }
        console.log("webpack entry:", dic);
        return dic;
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, "../../dist", SysConfig.JsPath)
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            ignoreOrder: false
        }),
    ],
    mode: "development",
    watch: true,
    watchOptions: {
        poll: 1, // 每秒询问多少次
        aggregateTimeout: 1000,  //防抖 多少毫秒后再次触发
        ignored: /node_modules/ //忽略时时监听
    }
});

module.exports = config;

export default config