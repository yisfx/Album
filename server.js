let express=require("express");
let conf=require("./conf/site.conf.json")


let app=express();
app.use("*",function(req,res){
    res.send("hahahahha 不支持"+req.baseUrl);
})

app.listen(conf.port,function(){
    console.log("listen at %d",conf.port)
})