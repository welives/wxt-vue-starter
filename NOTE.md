## 目录结构

```
📂 {rootDir}/
📁 .output/                   插件构建产物
📁 .wxt/                      WXT开发框架自动生成的配置目录
📂 src/                       插件源码目录
   📁 assets/                 静态资源,会被vite处理
   📁 components/
   📁 composables/
   📁 entrypoints/            WXT开发框架的核心文件夹,插件的入口
   📁 hooks/
   📁 modules/                WXT开发框架的模块目录
   📁 public/                 存放一些不希望被vite处理的静态资源
   📁 utils/
   📄 app.config.ts           运行时配置文件
📄 .env
📄 .env.publish
📄 package.json
📄 tsconfig.json
📄 web-ext.config.ts          浏览器配置文件
📄 wxt.config.ts              WXT开发框架的核心配置文件
```
