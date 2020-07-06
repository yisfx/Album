import path from "path";
import os from 'os';
import { RouteConfig } from "./src/framework/route.config"
// require("ts-loader")
import { ProgressPlugin } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WriteAssets, clean } from "./tools/writeAssets";
import HappyPack from "happypack";
import AssetsPlugin from "assets-webpack-plugin";

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });


const config = {
    entry: () => {
        let dic = {}
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
        path: path.join(__dirname, "dist/public")
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
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            path:path.join("dist/conf"),
            filename:"assets.conf.json",
            processOutput:function(output){
                const scripts = Object.entries(output).reduce(
                    (acc, [k, v]) => v.js ? ({ [k]: v.js, ...acc }) : acc, {}
                );
                console.log(scripts);

                return `${JSON.stringify(scripts,null,2)}`;
            }
        }),


        // new ProgressPlugin(function handler(percentage: number, msg: string) {
        //     if (percentage == 0) {
        //         clean(path.join(__dirname, "dist/public"))
        //         console.log("webpack start");
        //     }
        //     if (percentage == 1) {
        //         WriteAssets();
        //         console.log("webpack end", __dirname);
        //     }
        // }),
        new CleanWebpackPlugin(),
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
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css']
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