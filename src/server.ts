import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SysConfig } from './conf/site.config';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastify from 'fastify';
import * as hmac from "./framework/encryption/hmac";
import { CSPInterceptor } from './framework/interceptor/csp.interceptor';
import { AllExceptionsFilter } from './framework/filter/exception-filter';
import * as log4js from "log4js";
import path from 'path';



//https://github.com/JeniTurtle/nestjs-fastify/blob/master/src/server.ts
async function bootstrap() {

  const instance = fastify({ bodyLimit: 10240000, maxParamLength: 180 })
  const adapter = new FastifyAdapter(instance);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter
  );

  app.useGlobalInterceptors(new CSPInterceptor())
  app.useGlobalFilters(
    new AllExceptionsFilter(),
  )



  console.log("global Config-----------------------------------------:")
  console.log("A", ":", hmac.Encrypt("1"))
  console.log("B", ":", hmac.Encrypt("2"))
  console.log("C", ":", hmac.Encrypt("3"))
  console.log("D", ":", hmac.Encrypt("4"))
  console.log("global Config-----------------------------------------:")

  log4js.configure({
    appenders: {
      console: { type: "console" },
      cheese:
        { type: "file", filename: path.join(__dirname, "cheese.log") }
    },
    categories: { default: { appenders: ["cheese"], level: "error" } }
  })
  const logger = log4js.getLogger();


  process.on("uncaughtException", (err: Error) => {
    logger.error(err)
  });

  await app.listen(SysConfig.port, "0.0.0.0", (error, address) => {
    if (error) {
      console.log(error);
      process.exit(1)
    }
    else {
      logger.log("listen at", SysConfig.port)
      console.log("listen at", SysConfig.port);
    }
  });
}

bootstrap();
