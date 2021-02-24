"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function reactView(filePath, viewOptions, callback) {
    const body = viewOptions.script;
    const html = `<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <title>TRAVEL</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    </head>
    <body>
    <script>
        window.__reactData__=` + JSON.stringify(viewOptions.initData) + `
    </script>
    <div id="app">
    ` + "" + `
    </div>
    `
        +
            "<script src='" + viewOptions.script + "'></script>"
        +
            `
    <script>
    
    </script>
    <div style="text-align: center;bottom: 10px;">
            <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
        </div>
        <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </body>
    </html>`;
    callback(null, html);
}
exports.default = reactView;
//# sourceMappingURL=ReactView.js.map