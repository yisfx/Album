import { Injectable } from "@nestjs/common";


@Injectable()
export class HttpClient{
    constructor(){
    }
    
    async get(url:string){
        let a=await this.createClient()
        console.log(a.body)
    }


    private async createClient(){
        return fetch(
            "https://fxfxfxfx.cn",
            {
                method: 'GET',
                mode: 'no-cors',
                headers:{
                    "Access-Control-Allow-Origin":"*",
                    "Access-Control-Allow-Methods":"GET, POST"
                }
            }
        )
    }
}