// 参数装饰器功能实现
import "reflect-metadata";

// 生成参数装饰器的方法
//  返回一个工厂装饰器，用来对参数装饰器统一处理
export function createParamDecorator(key: string) {
  return (data?: any) => (target: any, propertyKey: string, parameterIndex: number) => {
    //  添加元数据，供装饰器中获取数据使用
    // 给控制器函数添加元数据, params:key 值为一个数组， 数组里放置那个位置使用哪个装饰器
    //获取当前方法上所有的参数位置和记录装饰器
    const existingParameters = Reflect.getMetadata("params", target, propertyKey) || [];
    //根据索引进行复制
    existingParameters[parameterIndex] = {
      parameterIndex,
      key,
      data,
    };
    // existingParameters.push();
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
  };
}

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
export const Query = createParamDecorator("Query"); // 需要传参处理
export const Headers = createParamDecorator("Headers");
export const Session = createParamDecorator("Session"); // 处理session会话  配置中间件支持session
export const Ip = createParamDecorator("Ip");
export const Param = createParamDecorator("Param"); // 处理路由参数
export const Body = createParamDecorator("Body"); // 处理body的参数
export const Res = createParamDecorator("Res"); // 处理Res
export const Response = createParamDecorator("Response"); // 处理Response
