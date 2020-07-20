
import { RENDER_METADATA } from "@nestjs/common/constants";
import { join } from "path";


export function RouteRender(page:string){
    return (target,temple,describe)=>{
        
        Reflect.defineMetadata(
            "__route__",
            page,
            describe.value
        );
        
        Reflect.defineMetadata(
            RENDER_METADATA,
            join("modules/RenderMateData.js"),
            describe.value
        );
        return describe
    }
}