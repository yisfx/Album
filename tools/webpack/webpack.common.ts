import path from "path";
import os from 'os';
import webpack from "webpack";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HappyPack from "happypack";
import AssetsPlugin from "assets-webpack-plugin";
import SysConfig from "../../src/conf/site.config";
import { ProgressPlugin } from "webpack";
import { publishStatic } from "../writeAssets";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });



export default <webpack.Configuration>{
    output: {
        filename: '[name]-[contenthash:8].js',
        path: path.join(__dirname, "../../dist", SysConfig.JsPath)
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
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: (url: string, _resourcePath: string) => url.includes('/fonts/')
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new AssetsPlugin({
            path: path.join(__dirname, "../../dist/conf"),
            filename: "assets.conf.json",
            processOutput: function (output) {
                const scripts = Object.entries(output).reduce(
                    (acc, [k, v]) => v.js ? ({ [k]: v.js, ...acc }) : acc, {}
                );
                console.log("js path:", path.join(__dirname, "../../dist/conf"))
                console.log("js:", output);
                return `${JSON.stringify(scripts, null, 2)}`;
            }
        }),
        new AssetsPlugin({
            path: path.join(__dirname, "../../dist/conf"),
            filename: 'assets.css.json',
            processOutput: function (x) {

                const styles: any = {};
                for (let key in x) {
                    if (!!key && !!x[key].css) {
                        styles[key] = x[key].css;
                    }
                }
                console.log("css path:", path.join(__dirname, "../../dist/conf"))
                console.log("css:", styles)
                return `${JSON.stringify(styles, null, 2)}`;
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[contenthash:8].css",
            ignoreOrder: false
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
    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin()
        ]
    },
    target: "web",
    resolve: {
        extensions: ['.ts', '.tsx', '.config', '.js', '.json', '.css', ".png"]
    },
};