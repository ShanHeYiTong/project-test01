import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import { TransformInterceptor } from "./global/interceptor/transform/transform.interceptor";

async function bootstrap() {
  //开启cors 策略 { cors: true }
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('测试项目') //主题名称
    .setDescription('2024-04 测试内容') //简介
    .setVersion('1.0') //版本
    .addTag('Api/V1') //接口标签分类
    // .addTag('list') //接口标签分类
    .build();
  const document = SwaggerModule.createDocument(app, options);
  //访问doc
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()) //注册拦截器
  await app.listen(4000);
}
bootstrap();
