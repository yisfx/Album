import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";
import { AppModule } from './app.module';
import { LayoutInterceptor } from './framework/Layout.Intercept';
import reactView from './framework/ReactView';


const port=9001

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LayoutInterceptor());
  app.useStaticAssets(join( __dirname),{
    prefix:"/kjsdfh/"
  })


  app.set('views', join(__dirname));
  app.set('view engine', 'js');

  app.engine('js', reactView);
  


  await app.listen(port);
  console.log("listen at",port);
}
bootstrap();
