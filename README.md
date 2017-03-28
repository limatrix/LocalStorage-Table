# lstable
封装LocalStorage, 提供save, get, update, remove接口. 可以满足简单的、少量数据的快速操作.

### 使用方法

在head标签内引入lstable.js
``` javascript
<script src='lstable.js'></script>
```
在使用时NEW一个对象, 参数为表名. 类似关系数据库的表
``` javascript
var question = new lstable('question')
```

### 接口

**.save(object)**

参数为JSON对象, 在存储时对象会被增加一个属性-id.

**.get(object || null)**

如果参数为空, 返回当前表的所有数据. 如果参数为一个JSON对象, 则会比较其所有字段, 但不支持复杂类型的比较.

**.update(object)**

JSON对象中必须有更新记录的id.

**.remove(object)**

如果JSON对象中有id, 只删除一条记录. 如果没有, 则删除字段相同的记录.

### 数据存储
``` 
answer-1    : {"fid":"1","text":"第一个问题第一个答案","date":1490685653158,"id":1}
answer-2    : {"fid":"1","text":"第一个问题第二个答案","date":1490685662013,"id":2}
answer-3    : {"fid":"2","text":"第二个问题第一个答案","date":1490685672944,"id":3}
answer-4    : {"fid":"2","text":"第二个问题第二个答案","date":1490685680263,"id":4}
question-1  : {"text":"第一个问题","id":1}
question-2  : {"text":"第二个问题","id":2}
answer-id   : 4
question-id : 2
```

### 其他

- 不支持复杂类型的比较
- 功能少, 只满足一些简单的应用