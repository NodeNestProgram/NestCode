import { Logger } from "./logger";

import { NestApplication } from "./nest-application";
//  创建app应用的核心模块
export class NestFactory {
  // create静态方法 创建express实例
  static async create(module: { new (...args): void }) {
    // 创建应用
    Logger.log("Starting Nest application...", "NestFactory"); // 启动nest应用
    const app = new NestApplication(module);

    return app;
  }
}
