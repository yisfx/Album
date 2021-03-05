
import * as path from "path";
import * as fs from "fs";

export function deleteFiles(folderPath) {
    return;
    let forlder_exists = fs.existsSync(folderPath);
    if (forlder_exists) {
        let fileList = fs.readdirSync(folderPath);
        fileList.forEach(function (fileName) {
            fs.unlinkSync(path.join(folderPath, fileName));
        });
    }
    console.log("delete :", forlder_exists, folderPath)
}

export function CopyPath(from: string, target: string) {
    ///删除文件

    //deleteFiles(from)


    var i = 0;
    fs.readdir(target, function (err, list) {
        // if (!!list && list.length > 0)
        //     list.forEach(item => {
        //         if (item == "old") {
        //             console.log("文件夹已存在");
        //             i = i + 1;
        //         }
        //     });
        if (i == 0) {
            fs.mkdir(path.join(target), function (err) {
                console.log("创建文件夹成功！");
                target = path.join(target);
                walkDir(from, target);
            });
        }
    });
}

function walkDir(from: string, target: string) {
    var list = fs.readdirSync(from);

    list.forEach(async function (item) {
        if (
            fs.statSync(path.join(from, item)).isDirectory()) {
            fs.mkdirSync(path.join(target, item));
            walkDir(path.join(from, item), path.join(target, item));
        } else {
            fs.copyFileSync(path.join(from, item), path.join(target, item));
        }
    });
}