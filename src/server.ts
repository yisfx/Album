import { NestFactory, } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";
import { AppModule } from './app.module';
import { LayoutInterceptor } from './framework/interceptor/Layout.Intercept';
import reactView from './framework/ReactView';
import { SysConfig } from './conf/site.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new LayoutInterceptor());
  app.useStaticAssets(join(__dirname), {
    prefix: SysConfig.VisualStaticPath
  })

  app.set('views', join(__dirname));
  app.set('view engine', 'js');

  app.engine('js', reactView);



  await app.listen(SysConfig.port);
  console.log("listen at", SysConfig.port);
}
bootstrap();
