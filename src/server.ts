import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/picture/album.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";

const port=9001

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  console.log(join( __dirname,"../","public"))
  app.useStaticAssets(join( __dirname),{
    prefix:"/kjsdfh/"
  })

  await app.listen(port);
  console.log("listen at",port);
}
bootstrap();
