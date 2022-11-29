# webpack5vue2
通过webpack来打包vue,并且增加了可扩展性,比如在打包时增加electron打包
使用vue2的类写法来开发
当前包的版本都已经固定，如果需要追最新版本自行升级

## 新增功能
1. 全局状态管理,抛弃了vuex
```
// 在src\core\run\start.ts中注入需要全局管理的类

在tsx中
---
@DIComponent
export default class Demo extends Vue
---

---
@Inject(IDemo) server = new IDemo() 
---

接下来正常注入来使用即可

```
2. 打包后兼容到ie10,发生错误需要自己修改可以通过esbuild-loader源码中捕获错误来查看详细错误
3. 使用swc替换了babel
4. 使用ts自带的解析功能来替换@vue/jsx