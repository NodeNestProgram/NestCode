// 装饰器的理解
//  5种装饰器
// 1. 类装饰器(装饰类本书， 参数是constructor, 其他都是属性的constructor.proto)  2. 属性装饰器 3. 访问器装饰器  4.方法装饰器  5.参数装饰器

// 1. 简单的类装饰器
function localDecorator(constructor: Function) {
  console.log(constructor.name, "constructor");
}

// 2. 装饰器工厂: 返回装饰器函数，来接收参数控制类的行为
function localFactory(prefix: string) {
  return function (constructor: Function) {
    console.log(constructor.name, prefix, "localFactory");
    //  改变类的行为
  };
}
@localFactory("cats")
class Person {
  public name: string;
}

// 2. 类装饰器扩展类的行为
//
function addStamp<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args) {
      super(...args);
      console.log("子类的构造函数");
    }
    timeStamp = new Date();
  };
}
interface Document {
  timeStamp: Date;
}

@addStamp
class Document {
  constructor(public title: string) {
    console.log(title, "tile");
    console.log("父类的构造函数");
  }
}

const doc = new Document("标题");
console.log(doc.title);
console.log(doc.timeStamp);

export {};

// 类的装饰器: 1. 传递参数  2. extends 继承  3. 返回新的构造函数，改变类的行为
//  3. 返回型的构造函数

// 二，方法装饰器 装饰方法 (target: any, attr: string, desc: PropertyDecorator): void | PropertyDecorator
//  AOP
/**
 *
 * @param target  如果属性是静态属性，target目标是类本身，如果是实例属性，装饰的是类的原型对象
 * @param attr  装饰的成员名称
 * @param descriptor 属性描述符
 */
function log(target: any, attr: string, descriptor: PropertyDescriptor) {
  const oldValue = descriptor.value; // 获取老的成员函数
  descriptor.value = function (...args) {
    console.log(`calling ${attr} with ${args}`);
    const result = oldValue.apply(this, args);
    console.log(result);
    return result;
  };
}
class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const cal = new Calculator();
cal.add(1, 2);

//  权限检查，在方法调用前 决定是否被调用
//  属性描述符

//  3. 属性装饰器 (target: object, attr: string)
//  属性访问器(利用属性描述符进行构造实现) 必填校验的功能

// 4. 参数装饰器的功能实现
