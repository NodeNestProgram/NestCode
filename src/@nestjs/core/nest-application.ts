//  启动express服务器
import { Logger } from "./logger";
import path from "path";
import express, {
  type Express,
  Request as ExpressRequest,
  Response as ExpressResponse,
  NextFunction,
} from "express";
export class NestApplication {
  private readonly app: Express = express();

  constructor(protected readonly module: { new (...args): void }) {
    //  创建一个module实例
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
        if (!methodMetadata) continue;
        // express上对应的 httpMethod.toLowerCase() => 请求发方式, path => 请求路径
        // 拼接请求路径
        const routePath = path.posix.join("/", prefix, pathMetadata);
        // express的回调请求方式
        this.app[methodMetadata.toLowerCase()](
          routePath,
          (
            request: ExpressRequest,
            res: ExpressResponse,
            next: NextFunction
          ) => {
            const result = Reflect.apply(method, controller, []); // 指定此方法的请求结果，发送给客户端
            res.send(result);
          }
        );
        Logger.log(
          `Mapped {${routePath}, ${methodMetadata}} route`,
          "RouterExplorer"
        );
      }
    }

    Logger.log("Nest application successfully started", "NestApplication");
  }

  // 应用启动
  async listen(port: number) {
    await this.init();
    this.app.listen(port, () => {
      Logger.log(
        `application is running: http://localhost:${port}`,
        "NestApplication"
      );
    }); // 调用express listen方法监听端口
  }
}
