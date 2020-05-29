let express=require("express");
let conf=require("./site.conf.json")


let app=express();

app.use("/1.jpg",express.static("./1.jpg"))
app.use("/favicon.ico",express.static("./favicon.ico"))

app.use("/",function(req,res){
    res.send(html);
})

app.listen(conf.port,function(){
    console.log("listen at %d",conf.port)
})


const html=
`
<html>
<head>
    <title>TRAVEL</title>
    <link href="./favicon.ico" rel="SHORTCUT ICON">
</head>
<body>
    <div style="text-align: center;top: 50%;height: 95%;">
        <img style="max-width: 100% ;width: auto;max-height: 80%;height: auto;" src="./1.jpg"/>
        <br/>
        <h1>旅行即将到来！</h1>
    </div>

    <div style="text-align: center;bottom: 10px;">
        <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
    </div>
</body>
</html>
`
