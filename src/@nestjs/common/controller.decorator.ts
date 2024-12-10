import "reflect-metadata";

interface ControllerOptions {
  prefix?: string;
}
// controller的前缀进行初始化兼容
export function Controller(): ClassDecorator;
export function Controller(prefix: string): ClassDecorator;
export function Controller(options: ControllerOptions): ClassDecorator;
export function Controller(prefixOrOptions?: string | ControllerOptions) {
  let options: ControllerOptions = { prefix: "/" };
  if (typeof prefixOrOptions === "string") {
    options.prefix = prefixOrOptions;
  }
  if (typeof prefixOrOptions === "object") {
    options.prefix = prefixOrOptions.prefix;
  }
  return (target: Function) => {
    //  给控制器类添加prefix的元数据
    Reflect.defineMetadata("prefix", options.prefix, target);
  };
}
