# 问题

```log

1. 问题： 执行 npx electron-forge import 报错

D:\code\my\electron-start\node_modules\listr2\dist\index.cjs:300
    this.options.fields ??= {};
                        ^^^
SyntaxError: Unexpected token '??='
    at wrapSafe (internal/modules/cjs/loader.js:984:16)
    at Module._compile (internal/modules/cjs/loader.js:1032:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
    at Module.load (internal/modules/cjs/loader.js:933:32)
    at Function.Module._load (internal/modules/cjs/loader.js:774:14)
    at Module.require (internal/modules/cjs/loader.js:957:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (D:\code\my\electron-start\node_modules\@electron-forge\cli\dist\electron-forge.js:10:18) 
    at Module._compile (internal/modules/cjs/loader.js:1068:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1097:10)
```

node 版本问题，当前 node 14 版本不支持 ?? 语法