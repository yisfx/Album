import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LayoutInterceptor } from './framework/interceptor/Layout.Intercept';
import { SysConfig } from './conf/site.config';
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import fastify from 'fastify';
import { AllExceptionsFilter } from './framework/filter/exception-filter';
import * as compression from 'fastify-compress';
import { join } from 'path';


async function bootstrap() {
  let instance = fastify({
    ignoreTrailingSlash: true,
    caseSensitive: false,
    // querystringParser: queryParser,
  });
  // instance.register()
  instance.addHook("onSend", (request, reply, payload, done) => {
    // reply.header("","")
    done(null, payload)
  })
  instance.addHook("onRequest", (req, reply, done) => {
    console.log("onRequest");
    done();
  })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(instance)
  );
  app.use(compression, { encodings: ['gzip', 'deflate'] })
  app.useGlobalInterceptors(new LayoutInterceptor());
  
  // app.set('views', join(__dirname));
  // app.set('view engine', 'js');

  // app.engine('js', reactView);
  app.useGlobalInterceptors(
    new LayoutInterceptor(),
  )
  app.useGlobalFilters(
    ...[new AllExceptionsFilter()],
  )


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
