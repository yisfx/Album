import { Module } from "@nestjs/common";
import { AlbumModule } from "./modules/picture/album.module";
import { DefaultModule } from "./modules/default/default.module";
import { AdminModule } from "./modules/admin/admin.module";


@Module({
    imports: [
        AlbumModule,
        AdminModule,
        DefaultModule
    ]
})


export class AppModule { }