import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LayoutInterceptor } from './framework/interceptor/Layout.Intercept';
import { SysConfig } from './conf/site.config';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastify from 'fastify';
import { AllExceptionsFilter } from './framework/filter/exception-filter';
import * as compression from 'fastify-compress';

//https://blog.csdn.net/qq_29334605/article/details/109670133
//https://github.com/JeniTurtle/nestjs-fastify/blob/master/src/server.ts
async function bootstrap() {
  const adapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter
  );
  // app.use(compression)

  // app.useGlobalFilters(
  //   ...[new AllExceptionsFilter()],
  // )


  console.log("global Config-----------------------------------------:")
  // Object.keys(GlobalConfig.AdminPwd).map(key => {
  // console.log("A", ":", Encrypt(""))
  // console.log("B", ":", Encrypt(""))
  // console.log("C", ":", Encrypt(""))
  // console.log("D", ":", Encrypt(""))
  // })
  console.log("global Config-----------------------------------------:")

  await app.listen(SysConfig.port, (error, address) => {
    if (error) {
      console.log(error);
      process.exit(1)
    }
    else {
      console.log("listen at", SysConfig.port);
    }
  });
}

bootstrap();
