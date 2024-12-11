import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import session from "express-session";

//  启动应用
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "your-secret-key", // 加密密钥
      resave: false, // 每次请求都重新设置session
      saveUninitialized: false, // 数据没有变化就不设置session
      cookie: {
        maxAge: 3600000 * 24, // 设置有效时间
      },
    })
  );
  app.listen(3000);
}

bootstrap();
// express + 装饰器功能实现
