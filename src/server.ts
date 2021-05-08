import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SysConfig } from './conf/site.config';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastify from 'fastify';
import * as hmac from "./framework/encryption/hmac";
import { CSPInterceptor } from './framework/interceptor/csp.interceptor';



//https://blog.csdn.net/qq_29334605/article/details/109670133
//https://github.com/JeniTurtle/nestjs-fastify/blob/master/src/server.ts
async function bootstrap() {

  const instance = fastify({ bodyLimit: 10240000, maxParamLength: 180 })
  const adapter = new FastifyAdapter(instance);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter
  );

  // app.use(compression)

  app.useGlobalInterceptors(...[new CSPInterceptor()])
  // app.useGlobalFilters(
  //   ...[new AllExceptionsFilter()],
  // )


  console.log("global Config-----------------------------------------:")
  console.log("A", ":", hmac.Encrypt("1"))
  console.log("B", ":", hmac.Encrypt("2"))
  console.log("C", ":", hmac.Encrypt("3"))
  console.log("D", ":", hmac.Encrypt("4"))

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
