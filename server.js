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
        <img style="max-width: 100% ;width: auto;max-height: 80%;height: auto;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590736919661&di=358787541391b1009b36d4aef1c50b53&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170316%2F064e3ef4b0054dc7b310bf7cb7023edb_th.jpg"/>
        <br/>
        <h1>旅行即将到来！</h1>
    </div>

    <div style="text-align: center;bottom: 10px;">
        <a href="http://beian.miit.gov.cn/">互联网ICP备案：豫ICP备20015772号</a>
    </div>
</body>
</html>
`
