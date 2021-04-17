

interface Options {
    css: string
    initData: any
    script: string
}


export default function reactView(
    viewOptions: Options,
    callback: (any, html: string) => {}
) {

    const css = viewOptions.css
    let cssLink = ""
    if (css) {
        cssLink = `<link href='${css}' rel='stylesheet'>`
    }
    ///master & template to build content

    const html = `<!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <title>TRAVEL</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        `
        +
        cssLink
        +
        `
    
    </head>
    <body>
    <script>
        window.__reactData__=`+ JSON.stringify(viewOptions.initData) + `
    </script>
    <div id="app">
    `+ "" + `
    </div>
    `
        +
        "<script src='" + viewOptions.script + "'></script>"
        +
        `
    <script>
    
    </script>
    
        <script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        </body>
    </html>`;

    callback(null, html)

}