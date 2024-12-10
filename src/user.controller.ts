import { Controller, Get, Request, Req } from "@nestjs/common";
import type { Request as ExpressRequest } from "express";

//  获取express中的请求对象
@Controller("users")
export class UserController {
  @Get("req")
  handleRequest(
    @Request() request: ExpressRequest,
    @Req() req: ExpressRequest
  ) {
    console.log(Object.getOwnPropertyNames(request));
    console.log(request.method);
    console.log(req.url);
    return "request";
  }
}
