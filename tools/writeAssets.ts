
import fs from "fs";
import path from "path";

export function WriteAssets(){
    let p=path.join(__dirname,"../dist/public/")

    console.log(p)
    let files= fs.readdirSync(p);
    
    let ass={}
    files.map(f=>{
        let name= f.split('-')[0];

        ass[name]=f;
    })
    p=path.join(__dirname,"../dist","conf");
    if(!fs.existsSync(p)){
        fs.mkdirSync(p)
    }
    
    fs.writeFileSync(path.join(__dirname,"../dist","conf","assets.conf.json"),JSON.stringify(ass),{flag:'w',encoding:'utf-8',mode:'0666'})

}