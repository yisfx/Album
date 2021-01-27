
import { RENDER_METADATA } from "@nestjs/common/constants";
import { join } from "path";
import metadate from "./constants";


export function RouteRender(page: string) {
    return (target, temple, describe) => {
        Reflect.defineMetadata(
            metadate.Route_Name_Metadata,
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