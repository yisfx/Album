import path from "path";
import os from 'os';
import { RouteConfig } from "./src/framework/route.config"
// require("ts-loader")
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HappyPack from "happypack";
import AssetsPlugin from "assets-webpack-plugin";
const SysConfig = require("./conf/site.config.json");
import { ProgressPlugin } from "webpack";
import { publishStatic } from "./tools/writeAssets";
import { deleteFiles } from "./tools/fileTool";
// import CopyWebpackPlugin from "copy-webpack-plugin";
// import { WebpackPluginInstance as plugin } from "webpack";
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


const config = {
    entry: () => {
        let dic = {}
        deleteFiles(SysConfig.JsPath)
        for (let route in RouteConfig) {
            let r = RouteConfig[route]
            dic[r.name] = path.join(__dirname, "src", "modules", r.page);
        }
        console.log("webpack entry:", dic);
        return dic;
    }
    ,
    output: {
        filename: '[name]-[contenthash:8].js',
        path: path.join(__dirname, "dist", SysConfig.JsPath)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'happypack/loader?id=happyBabel',
                exclude: /node_modules\/(?!@b2c-site|@framework-frontend|phoenix-ui)/
            },
            {
                test: /\.tsx?$/,
                use: 'happypack/loader?id=happyBabel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path: path.join("dist/conf"),
            filename: "assets.conf.json",
            processOutput: function (output) {
                const scripts = Object.entries(output).reduce(
                    (acc, [k, v]) => v.js ? ({ [k]: v.js, ...acc }) : acc, {}
                );
                console.log(scripts);
                return `${JSON.stringify(scripts, null, 2)}`;
            }
        }),


        new ProgressPlugin(function handler(percentage: number, msg: string) {
            if (percentage == 0) {

                console.log("webpack start");
            }
            if (percentage == 1) {
                ///copy image
                publishStatic()
            }
        }),

        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: __dirname + "/static",
        //             to: __dirname + "/dist/static"
        //         }
        //     ]
        // }),
        new HappyPack({
            id: "happyBabel",
            use: [{
                path: "ts-loader",
                query: {
                    happyPackMode: true,
                    configFile: "tsconfig.react.json"
                }
            }],
            threadPool: happyThreadPool,
            verbose: true
        })
    ],
    mode: "development",
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css', ".png"]
    },
    watch: true,
    watchOptions: {
        poll: 1000, // 每秒询问多少次
        aggregateTimeout: 500,  //防抖 多少毫秒后再次触发
        ignored: /node_modules/ //忽略时时监听
    }
};

module.exports = config;

export default config