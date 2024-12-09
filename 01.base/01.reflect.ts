// import "reflect-metadata";
const obj = { a: 1 };
//  获取obj上的a属性
console.log(Reflect.get(obj, "a"));

Reflect.set(obj, "b", 2);
//  Reflect上的属性
console.log(Reflect.get(obj, "b"));

//  研究和掌握Reflect的属性

//
