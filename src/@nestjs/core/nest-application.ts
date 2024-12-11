//  启动express服务器
import { Logger } from "./logger";
import path from "path";
import express, { type Express, Request as ExpressRequest, Response as ExpressResponse, NextFunction } from "express";
export class NestApplication {
  private readonly app: Express = express();

  constructor(protected readonly module: { new (...args): void }) {
    //  创建一个module实例
    // 处理body的解析
    this.app.use(express.json()); // 处理body实体 把json数据解析到req对象上
    this.app.use(express.urlencoded({ extended: true })); // 处理表单请求
  }
  use(...args) {
    // 调用express的use方法
    this.app.use(...args); // 使用express中间件
  }
  async init() {
    // 取出模块中所有的控制器
    const controllers = Reflect.getMetadata("controllers", this.module) || []; // 从模块上取出控制器
    Logger.log("AppModule dependencies initialized", "NestApplication");
    for (const Controller of controllers) {
      const controller = new Controller(); // 创建每个控制器的实例
      //    什么样的路径匹配什么样的控制器
      const prefix = Reflect.getMetadata("prefix", Controller); // 从类上获取对应的匹配前缀
      Logger.log(`${Controller.name}: {${prefix}}`, "RoutesResolver"); // 开始控制器路由解析

      const controllerProto = Reflect.getPrototypeOf(controller);
      //   遍历类原型上的方法名
      for (const methodName of Object.getOwnPropertyNames(controllerProto)) {
        // 获取原型方上的元数据对应的方法
        const method = controllerProto[methodName];
        // 获取请求的方式
        const methodMetadata: string = Reflect.getMetadata("method", method);
        // 获取原型方法对应的路径
        const pathMetadata = Reflect.getMetadata("path", method);
        // 处理路径参数的问题?

        if (!methodMetadata) continue;
        // express上对应的 httpMethod.toLowerCase() => 请求发方式, path => 请求路径
        // 拼接请求路径
        const routePath = path.posix.join("/", prefix, pathMetadata);
        // express的回调请求方式
        this.app[methodMetadata.toLowerCase()](
          routePath,
          (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
            const args = this.resolveParams(controller, methodName, req, res, next);
            // 把处理后的结果传递给函数进行执行 把返回值返回给客户端
            const result = Reflect.apply(method, controller, args); // 指定此方法的请求结果，发送给客户端
            // 获取当前方法上的参数是否有Res或者Response的元数据, 如果存在，就让客户端自己返回数据
            const resMetadata = this.getResMetadata(controller, methodName);
            // 不存在Res或者Response的元数据，就把结果返回给客户端, 否在通过用户自定义设置passthrough:true 也直接返回给客户端
            if (!resMetadata || resMetadata?.data?.passthrough) {
              res.send(result);
            }
          }
        );
        Logger.log(`Mapped {${routePath}, ${methodMetadata}} route`, "RouterExplorer");
      }
    }

    Logger.log("Nest application successfully started", "NestApplication");
  }
  /**
   * 获取指定实例和方法名的响应元数据。
   *
   * @param instance - 要检查的实例。
   * @param methodName - 要检查的方法名。
   * @returns 包含响应元数据的对象，如果未找到则返回 undefined。
   */
  private getResMetadata(instance: any, methodName: string) {
    const paramMetadata = Reflect.getMetadata("params", instance, methodName);
    // 过滤掉空值并找到键为 "Res" 或 "Response" 的元数据
    const resMetadata = paramMetadata.filter(Boolean).find((metadata) => {
      return metadata.key === "Res" || metadata.key === "Response";
    });
    return resMetadata;
  }

  private resolveParams(
    instance: any,
    methodName: string,
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
  ) {
    // 获取请求参数的原数据 ?? undefined|null的时候 执行后面的逻辑
    const paramMetadata = Reflect.getMetadata("params", instance, methodName) ?? []; // 获取函数参数的原数据
    // 根据索引进行估值
    return paramMetadata.map((metadata) => {
      const { key, data } = metadata;
      switch (key) {
        case "Req":
        case "Request":
          return req; // 返回express请求对象
        case "Query":
          return data ? req.query[data] : req.query; // 返回请求的query参数 或者查询参数
        case "Headers":
          return data ? req.headers[data] : req.headers; // 返回请求头
        case "Session":
          return data ? req.session[data] : req.session; // 返回session对象
        case "Ip":
          return req.ip; // 返回请求的ip
        case "Param":
          return data ? req.params[data] : req.params; // 返回请求的参数
        case "Body":
          return data ? req.body[data] : req.body; // 返回请求的body数据
        case "Res":
        case "Response":
          return res; // 返回express的响应对象
        default:
          return null;
      }
    });
  }

  // 应用启动
  async listen(port: number) {
    await this.init();
    this.app.listen(port, () => {
      Logger.log(`application is running: http://localhost:${port}`, "NestApplication");
    }); // 调用express listen方法监听端口
  }
}
