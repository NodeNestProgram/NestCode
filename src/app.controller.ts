import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("hello") // 指定该方法特定路径上的特定请求
  index() {
    return "hello";
  }
}
