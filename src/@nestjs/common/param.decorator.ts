// 参数装饰器功能实现
import "reflect-metadata";

// 生成参数装饰器的方法
//  返回一个工厂装饰器，用来对参数装饰器统一处理
export function createParamDecorator(key: string) {
  return () => (target: any, propertyKey: string, parameterIndex: number) => {
    //  添加元数据，供装饰器中获取数据使用
    console.log(target, parameterIndex, propertyKey);
    // 给控制器函数添加元数据, params:key 值为一个数组， 数组里放置那个位置使用哪个装饰器
    //获取当前方法上所有的参数位置和记录装饰器
    const existingParameters =
      Reflect.getMetadata("params", target, propertyKey) || [];
    existingParameters.push({
      parameterIndex,
      key,
    });
    Reflect.defineMetadata(`params`, existingParameters, target, propertyKey);
  };
}

export const Request = createParamDecorator("Request");
export const Req = createParamDecorator("Req");
