import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

//  Module代码的组合的基本单元 组合Controller和Service
@Module({
  controllers: [AppController],
})
export class AppModule {}
