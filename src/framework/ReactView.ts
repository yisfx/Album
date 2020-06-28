const html = `<!DOCTYPE html>
    <html>
    <head>
        <title>TRAVEL</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    </head>
    <body>
    <script>
        __readtData__=;
    </script>
    <div id="app">
    </div>
    
    <script src='__reactScript__'></script>

    <script>
    
    </script>
    <div style="text-align: center;bottom: 10px;">
            <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
        </div>
    </body>
    </html>`;

export default function reactView(
    filePath: string,
    viewOptions,
    callback
) {

    let content = html.replace("__reactScript__", viewOptions.script);

    content = content.replace(" __readtData__=", "window.__reactData__=" + JSON.stringify(viewOptions.initData))

    callback(null, content)

}