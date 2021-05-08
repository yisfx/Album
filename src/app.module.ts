import { Module } from "@nestjs/common";
import { AlbumModule } from "./modules/picture/album.module";
import { DefaultModule } from "./modules/default/default.module";
import { AdminModule } from "./modules/admin/admin.module";
import { LoginModule } from "./modules/login/login.module";


@Module({
    imports: [
        AlbumModule,
        AdminModule,
        LoginModule,
        DefaultModule
    ]
})


export class AppModule { }