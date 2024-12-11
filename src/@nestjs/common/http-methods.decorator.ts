import "reflect-metadata";

// 方法装饰器工厂
export function Get(path: string = ""): MethodDecorator {
  /**
   * target 类的原型
   * propertyKey 属性键名
   * descriptor 属性描述器
   */
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 1. 使用请求路径给当前的函数定义元数据
    Reflect.defineMetadata("path", path, descriptor.value);
    // 2. 使用请求方法给当前函数定义元数据
    Reflect.defineMetadata("method", "GET", descriptor.value);
    // 3. 通过方法上定义的{path描述和method描述}存储方法映射的关系。用于后续表的映射关系确定对应函数的处理逻辑
  };
}

// 实现Post装饰器
export function Post(path: string = ""): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata("path", path, descriptor.value);
    Reflect.defineMetadata("method", "POST", descriptor.value);
  };
}
