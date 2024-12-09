import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

//  启动应用
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.listen(3000);
}

bootstrap();

//  express + 装饰器
