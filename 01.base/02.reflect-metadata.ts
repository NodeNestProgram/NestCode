import "reflect-metadata";
import { metadata } from "reflect-metadata/no-conflict";

class Person {
  public name;

  @Reflect.metadata("custom", "122") // 给属性定义元数据
  sayHello() {}
}

//  给person类定义原属性
const person = new Person();
Reflect.defineMetadata("name", "zhangsan", person);
const username = Reflect.getMetadata("name", person); //给元素的属性或者元素的方法添加标记tag 描述信息
console.log(username);

console.log(Reflect.hasMetadata("name", person));

// Reflect.deleteMetadata("name", person);
console.log(Reflect.hasMetadata("name", person));

// defineMetadata()

//  给name属性定义元数据
// Reflect.defineMetadata("xiaoming", "123", person) 三个参数 给`对象`定义元数据
// // Reflect.defineMetadata("xiaoming", "123", person, "name") 四个参数 给`对象的属性`定义元数据
Reflect.defineMetadata("xiaoming", "123", person, "name");
console.log(Reflect.getMetadata("xiaoming", person, "name")); // 获取对象属性的元数据

//  hasMetadata 描述信息就是元数据 反射机制 给属性和类进行打标签 查看是否有元数据 go中的标签机制 js中的元数据描述信息

// deleteMetadata 删除属性或者实例的元数据
// 获取自己的元数据
console.log(Reflect.getOwnMetadata("sayHello", person)); //获取自己的原数据

// 获取自己对象上的元数据
console.log(
  Reflect.getOwnMetadata("custom", Reflect.getPrototypeOf(person), "sayHello")
); //获取自己的原数据

//  获取对象上的原数据
console.log(Reflect.getMetadata("custom", person, "sayHello")); //获取自己的原数据

//  认识Reflect
