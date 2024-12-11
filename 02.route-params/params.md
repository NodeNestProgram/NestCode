### 参数装饰器

- 元数据记录当前函数存在的索引位置和对应的装饰器
  - Request 参数装饰器的顺序是从右向左, 在 express 参数执行的时候是从左向右
  - Req
  - Query Query(id?)
  - Headers(string?)
  - Session(string?) 基于 express.use(...args) 这个是中间件的实现逻辑？
  - Param 基于 express 实现，直接返回 express 的解析
  - Body(string?) 基于 express 实现，直接返回 express 的解析, 在 express 中是通过 body-parser 实现的
  - Res/Response 返回的时 1: 交给客户端进行处理 2: 设置{passthrough: true}直接返回给客户端
