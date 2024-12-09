import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get() // 指定该方法特定路径上的特定请求
  hello() {
    return "hello";
  }
}
