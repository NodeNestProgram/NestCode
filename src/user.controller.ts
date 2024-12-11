import {
  Controller,
  Get,
  Request,
  Req,
  Query,
  Headers,
  Session,
  Ip,
  Param,
  Post,
  Body,
  Res,
  Response,
} from "@nestjs/common";
import type { Request as ExpressRequest } from "express";

//  获取express中的请求对象
@Controller("users")
export class UserController {
  @Get("req")
  handleRequest(@Request() request: ExpressRequest, age: number, @Req() req: ExpressRequest) {
    console.log(age, "age");
    console.log(request.method);
    console.log(req.url);
    const keys = Object.getOwnPropertyNames(request);
    return `request: ${keys}`;
  }

  @Get("query")
  query(@Query() query: any, @Query("id") id: string) {
    console.log(query, id);
    return `query id:${id}`;
  }

  @Get("headers")
  query2(@Headers() header: string, @Headers("cookie") cookie: string, @Headers("host") host: string) {
    console.log(header, cookie);

    return `query cookie:${cookie}, host:${host}`;
  }

  @Get("session")
  handleSession(@Session() session: any, @Session("prevView") prevView: string) {
    console.log(session);
    if (session.prevView) {
      session.prevView++;
    } else {
      session.prevView = 1;
    }
    console.log(prevView);
    return `session: ${session.prevView}`;
  }

  @Get("ip")
  handleParam(@Ip() id: string) {
    return `param id:${id}`;
  }

  @Get("param/:id/:name")
  handleParam2(@Param("id") id: string, @Param("name") name: string, @Param() params: any) {
    console.log(params);
    return `param id:${id}, name:${name}`;
  }

  @Get("ab*de")
  handleBody() {
    return "abcderf";
  }

  @Post("post")
  handleBody2() {
    return "abcder222f"; //
  }

  @Post("create")
  handleBody3(@Req() req: any) {
    return req.body;
  }

  // 在使用Res 或者 Response装饰器装饰的时候，响应需要自己定义，否则会被挂起
  @Post("hang")
  handleBody4(@Res() res1: any, @Response() res2: string) {
    res1.send("Response1");
    return "Response";
  }

  @Post("passthrough")
  passthrough(@Res({ passthrough: true }) res1: any, @Response() res2: string) {
    return "Response2";
  }
}
