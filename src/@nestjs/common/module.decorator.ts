import "reflect-metadata";

interface ModuleMetadata {
  controllers: Function[];
}

//  类装饰器工厂
export function Module(metadata: ModuleMetadata): ClassDecorator {
  return function (target: Function): void {
    //  给target类添加 controllers 元数据, 值是数组
    Reflect.defineMetadata("controllers", metadata.controllers, target);
  };
}
