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

## 入口文件

在开发Chrome插件时，有以下4个入口文件

```
📄 background.js               用于在浏览器后台处理事件的
📄 content.js                  给网页注入内容,或者说用来渲染插件的页面或组件,一般是特定的页面
📄 injected.js                 给整个网页注入内容
📄 popup.html                  弹窗,通常是指点击插件图标时的弹窗
```

## Content Script UI

与 popup 不同，Content Script UI 的实现方式比较复杂，所以 WXT 提供了三种模式去创建内容脚本 UI

|方法|样式隔离|事件隔离|HMR|使用页面上下文|
|:--:|:--:|:--:|:--:|:--:|
|`Integrated`|❌合并|❌|❌|✅|
|`Shadow Root`|✅|✅默认关闭|❌|✅|
|`IFrame`|✅|✅|✅|❌|

### Integrated

这种方式是将脚本和样式一块注入，这意味着页面上的内容和脚本 UI 内容互相是产生影响的

> 建议期望内容脚本 UI 与页面风格一致时使用

```ts
import { createApp } from 'vue';
import HelloWorld from './HelloWorld.vue';

export default defineContentScript({
  // 匹配对应的 URL 去注入, 不论哪种方式都需要填这个参数
  matches: ['<all_urls>'],
  main(ctx) {
    const ui = createIntegratedUi(ctx, {
      // 表示注入方式，可选值有 inline、overlay、modal
      position: 'inline',
      // 是一个 CSS 选择器或函数，也就是将 UI 插入到页面的哪个位置
      anchor: '#anchor',
      onMount: (container) => {
        const app = createApp(HelloWorld);
        app.mount(container);
        return app;
      },
      onRemove: (app) => {
        app.unmount();
      },
    });
    ui.mount();
  },
});
```

### Shadow Root

如果你不想 CSS 互相影响，那么你可以选择这种模式

```ts
import './style.css'; // 注意要引入 CSS
import { createApp } from 'vue';
import HelloWorld from './HelloWorld.vue';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui', // 注入模式
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      // 与上一个例子一致
    });
    ui.mount();
  },
});
```

### IFrame

大家对它都很熟悉了，很多微前端框架都支持这种形式，因为它天生就对 CSS 和脚本隔离

WXT 提供了一个辅助函数 createIframeUi，用来加载一个 HTML 页面

```ts
export default defineContentScript({
  matches: ['<all_urls>'],
  async main(ctx) {
    const ui = await createIframeUi(ctx, {
      page: '/example-iframe.html',
      // 其他配置一致
    });
    ui.mount();
  },
});
```

## 远程代码

Google 对 Manifest V3 要求不能依赖远程代码，我们在使用谷歌分析这类工具时，可以采用这样的方式

```ts
import 'url:https://www.googletagmanager.com/gtag/js?id=G-XXXXXX';
```

`import + url`: 的形式，WXT 会自动下载远程代码到本地


## 引入shadcn-vue

- 修改`tsconfig.json`，指定根目录位置和源码目录别名

必须要手动指定，因为使用WXT的默认配置的话，`shadcn`会被下载到根目录的上一级目录

```json
{
  "extends": "./.wxt/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~": ["./src"],
      "~/*": ["./src/*"]
    }
  }
}
```

- 根目录创建`components.json`

```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "default",
  "typescript": true,
  "tsConfigPath": "./tsconfig.json",
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "framework": "vite",
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils",
    "ui": "~/components/ui"
  }
}
```

- 因为使用了`UnoCSS`代替`TailwindCSS`，所以不要执行官方教程的`npx shadcn-vue@latest init`，而是手动安装以下依赖

```bash
pnpm add -D unocss-preset-shadcn
pnpm add clsx tailwind-merge class-variance-authority lucide-vue-next radix-vue
```


- 接着在`src`目录下创建`lib/utils.ts`

```ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- 现在可以安装`shadcn-vue`组件了

```bash
pnpm dlx shadcn-vue@latest add button
```
