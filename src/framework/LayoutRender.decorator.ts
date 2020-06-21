let ass=require("../../conf/assets.conf")


let html=
`
<!DOCTYPE html>

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
</html>
`



export function LayoutRender(page:string){
    return (a,temple,describe)=>{
        let f=describe.value;
        describe.value=()=>{
            const stateData=f();
            let script=RenderScript(ass[page]);


            let resp=html.replace("let __readtData__=",`window.__reactData__=${JSON.stringify(stateData)}`).replace("__reactScript__",script);
            return resp
        }
        return describe;
    }
}


function RenderScript(js:string):string{
    return `<script src='kjsdfh/${js}'></script>`
    
}