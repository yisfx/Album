
import { RENDER_METADATA } from "@nestjs/common/constants";
import { join } from "path";
import reactView from "../ReactView";
import metadate from "./constants";


export function RouteRender(page: string) {
    return (target, temple, describe) => {
        Reflect.defineMetadata(
            metadate.Route_Name_Metadata,
            page,
            describe.value
        );
        
        // Reflect.defineMetadata(
        //     RENDER_METADATA,
        //     reactView,
        //     describe.value
        // );
        return describe
    }
}