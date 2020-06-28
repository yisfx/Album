import gulp, { series } from "gulp";
import webpack from "webpack";
import config from "./webpack.config";

import ts from "gulp-typescript";
import { exec } from "child_process";

const tsProject = ts.createProject("tsconfig.json")

//watch
gulp.task("listening",(cb)=>{
    gulp.watch("/src",()=>{
        console.log("in listening")
        // series("webpack","tsc")((done)=>{
        //     console.log(done,"hee")
        // })
        
    })
})


gulp.task("webpack", () => {
    return new Promise((resolve, reject) => {
        webpack(
            <webpack.Configuration>{ ...config },
            (err, stats) => {
                if (!!err)
                    console.log("webpack err:", err)
                resolve();
            })

    })
})

gulp.task("tsc", (cb) => {
    try {
        exec("start cmd.exe /K tsc -b --watch")
        // return tsProject.src()
        //     .pipe(tsProject())
        //     .js
        //     .pipe(gulp.dest("dist"))
    } finally {
        cb()
    }
})

gulp.task("run", (cb) => {
    try{
    exec("start cmd.exe /K nodemon --inspect ./dist/server.js")
    }finally{
        cb()
    }
})




exports.default = series(
    "webpack", 
    "tsc", 
    "run"
    )