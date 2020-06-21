import { Controller, Get, Req, Res } from '@nestjs/common';
import { AlbumService } from './album.service';
import { LayoutRender } from '../../framework/LayoutRender.decorator';
import { RouteConfig } from '../../framework/route.config';
import { join } from "path";

@Controller()
export class AlbumController {
  constructor(private readonly appService: AlbumService) {}

  @Get()
  @LayoutRender(RouteConfig.ALBUM.name)
  getHello() {
    return {a:"a",b:__dirname}
  }


  @Get("*.js")
  root(@Req() req,@Res() res): any {

    let dir:[]=req.url.split("/")
    let f=dir[dir.length-1]
    res.sendFile(join(__dirname, '../../../', `public/${f}`))
  }

}