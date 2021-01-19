# webpack 基本示例



版本: 5.11.1



webpack 通过分析模块的导入依赖，构建出依赖关系图，再用这个图来生成优化的包，并保证包内容的正确执行顺序



webpack 本身除了 `import`	和 `export` 不会改动其他代码，所有需要其他特性的支持就需要用到



如果webpack.config.js 存在，默认就会使用



从v5 开始 可以使用 asset modules 代替 原来的 raw-loader url-loader file-loader ，共四种type 

`asset/resource`：处理成单独的文件并添加URL，同原来的 file-loader

`asset/inline`：将资源处理成内联的URI，相当于url-loader

`asset/source`：导出资源的源代码，同 raw-loader

`asset`：自动处理为内联的URI或者单独的文件，在之前通过设置url-loader 的size limit 来实现

V5 中如果loader 和 Asset Module 共同存在，可以将type设置为 `javascript/auto`来停止使用Asset Module

[详见](https://webpack.js.org/guides/asset-modules/)



## 开发环境

三种方式帮助开发者自动编译文件

1. Watch mode ，webpack 的 `--watch` 模式，缺点是不能使浏览器自动刷新。
2. webpack-dev-server  [配置链接](https://webpack.js.org/configuration/dev-server/) [HMR](https://webpack.js.org/guides/hot-module-replacement/)
3. Web pack-dev-middleware 通过自己启动一个server 来监听文件更改，需要手动实现自动刷新



## 代码拆分

三种方式

1. entry points，通过配置 entry 手动拆分，缺点是会重复打包相同的引用，不灵活
2. 防止重复， [entry depencies](https://webpack.js.org/configuration/entry-context/#dependencies) 或者 [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)
3. 动态导入，使用ES 的 import() 方法 或 webpack 的 require.ensure 方法

动态导入通过添加 特殊注释，可以支持预请求与预加载

prefetch: resource is probably needed for some navigation in the future
preload: resource will also be needed during the current navigation



用于分析打包结构的工具

webpack-chart: Interactive pie chart for webpack stats.
webpack-visualizer: Visualize and analyze your bundles to see which modules are taking up space and which might be duplicates.
webpack-bundle-analyzer: A plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.
webpack bundle optimize helper: This tool will analyze your bundle and give you actionable suggestions on what to improve to reduce your bundle size.
bundle-stats: Generate a bundle report(bundle size, assets, modules) and compare the results between different builds.



## 缓存

v5 中 已经做好了在打包时没有修改的就直接取缓存，之前的版本需要手动设置moduleIds



## 推荐使用的 一些包



svg 压缩 mini-svg-data-uri https://www.npmjs.com/package/mini-svg-data-uri

html 自动生成 html-webpack-plugin

清理编译文件夹 clean-webpack-plugin 

Css https://webpack.js.org/plugins/mini-css-extract-plugin/



## 相关阅读

https://webpack.js.org/guides/code-splitting/

https://webpack.js.org/concepts/manifest/

https://webpack.js.org/guides/caching/

