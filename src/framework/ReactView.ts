

export default function reactView(
    filePath: string,
  viewOptions,
  callback
){

    console.log("react view")

    const html=`<!DOCTYPE html>
    <html>
    <head>
        <title></title>
    
    </head>
    <body>
    <script>
        let __readtData__=;
    </script>
    <div id="app">
    </div>
    
    
    __reactScript__
    
    
    <script>
    
    </script>
    <div style="text-align: center;bottom: 10px;">
            <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
        </div>
    </body>
    </html>`

    callback(null,html)

}