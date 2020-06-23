import { Module } from "@nestjs/common";
import { AlbumModule } from "./modules/picture/album.module";
import { DefaultModule } from "./modules/default/default.module";


@Module({
    imports:[AlbumModule,DefaultModule]
})


export class AppModule{}