import gulp, { series } from "gulp";
import webpack from "webpack";
import config from "./webpack.config";
import webpackPublishConfig from "./webpack.publish.config";

import ts from "gulp-typescript";
import { exec } from "child_process";

const tsProject = ts.createProject("tsconfig.json")
import * as os from "os"

type Platform = 'aix'
    | 'android'
    | 'darwin'
    | 'freebsd'
    | 'linux'
    | 'openbsd'
    | 'sunos'
    | 'win32'
    | 'cygwin'
    | 'netbsd';

const isLunix = os.platform() == "linux"
console.log("current platform:", os.platform())
//watch
gulp.task("listening", (cb) => {
    gulp.watch("/src", () => {
        console.log("in listening")
        cb();
    })
})


gulp.task("webpack", (cb) => {
    webpack(
        <webpack.Configuration>{ ...config },
        (err, stats) => {
            cb();
            if (!!err)
                console.log("webpack err:", err)
        })
})

gulp.task("webpackPublish", (cb) => {
    console.log("webpackPublish")
    webpack(
        <webpack.Configuration>{ ...webpackPublishConfig },
        (err, stats) => {
            cb();
            if (!!err)
                console.log("webpack err:", err)
        })
})


gulp.task("tscPublish", (cb) => {
    try {
        console.log("tscPublish ing")
            exec("tsc -b");
    } finally {
        cb()
    }
})

gulp.task("tsc", async (cb) => {
    try {
        await exec("start cmd.exe /K tsc -b --watch")
        // return tsProject.src()
        //     .pipe(tsProject())
        //     .js
        //     .pipe(gulp.dest("dist"))
    } finally {
        cb()
    }
})

gulp.task("run", async (cb) => {
    try {
        await exec("start cmd.exe /K nodemon --inspect ./dist/server.js")
    } finally {
        cb()
    }
})

// if (process.argv && process.argv.length > 2) {
//     let name = process.argv[2];
//     switch (name) {
//         case "build": break;
//         default: task = [...task, "run"];
//     }
// }

exports.publish = series(
    "webpackPublish",
    // "tscPublish",
);
exports.dev = series(
    "webpack",
    "tsc",
    "run"
)
exports.default = series(
    "webpack"
)
