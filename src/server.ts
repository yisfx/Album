import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from "path";
import { AppModule } from './app.module';
import { LayoutInterceptor } from './framework/interceptor/Layout.Intercept';
import reactView from './framework/ReactView';
import { SysConfig } from './conf/site.config';
// import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
// import fastify from 'fastify';
import { GlobalConfig } from './conf/global.config';
import { Encrypt } from './framework/encryption/hmac';

async function bootstrap() {
  // let instance = fastify();
  // let adapter = new FastifyAdapter({ logger: true })
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );

  app.useGlobalInterceptors(new LayoutInterceptor());
  // app.useStaticAssets(join(__dirname), {
  //   prefix: SysConfig.VisualStaticPath
  // })
  app.set('views', join(__dirname));
  app.set('view engine', 'js');

  app.engine('js', reactView);

  console.log("global Config-----------------------------------------:")
  // Object.keys(GlobalConfig.AdminPwd).map(key => {
    console.log("A", ":", Encrypt("关于郑州我知道的不多"))
    console.log("B", ":", Encrypt("看沉默的电话她什么都不说"))
    console.log("C", ":", Encrypt("rangwochayixiagugeditubeilunzenmezou"))
    console.log("D", ":", Encrypt("wozaiguloudeyesezhongweinichanghuaxiangzilai"))
  // })
  console.log("global Config-----------------------------------------:")

  await app.listen(SysConfig.port, "0.0.0.0");
  console.log("listen at", SysConfig.port);
}
bootstrap();
