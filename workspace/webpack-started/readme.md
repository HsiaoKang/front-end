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



推荐使用的 一些包



svg 压缩 mini-svg-data-uri https://www.npmjs.com/package/mini-svg-data-uri

html 自动生成 html-webpack-plugin

清理编译文件夹 clean-webpack-plugin 



相关阅读

https://webpack.js.org/guides/code-splitting/

https://webpack.js.org/concepts/manifest/

https://webpack.js.org/guides/caching/