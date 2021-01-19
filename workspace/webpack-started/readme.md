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



## 开发库

通过基本的配置可以将代码作为几种类型的库输出，支持全局变量、this、Window、UMD（require）的引入方式。

## 环境变量

关于为什么使用 NODE_ENV https://dzone.com/articles/what-you-should-know-about-node-env

webpack --env 来设置环境变量

通过导出一个函数从参数中接受环境变量



## 性能

官方给出的通用性能优化建议，包括开发和构建：

1. loader：尽量少的loaders
2. loader：在rule中使用`include` 指定文件夹
3. bootstrap：每个loader/plugin 都有启动的时间，尝试使用更少的工具
4. resolving：最小化这些项目的数量`resolve.modules` ,`resolve.extensions`,`resolve.manFiles`,`resolve.descriptionFiles`，因为增加了文件系统的调用
5. resolving：没有使用软连接则将 `reolve.symlinks` 设为 false
6. resolving：使用自定义的 resolving plugins ，就把`resolve.cacheWithContext` 设为false
7. dlls：使用Dllplugin 将不常更改的代码移动到单独的编译，增加的构建的复杂度，但确实可以减少时间
8. Smaller: 减少代码量（librareis），多页应用以`async`的模式使用`SplitChunksPlugin`，删除无用代码，仅编译当前正在开发的代码。
9. Worker Pool: 性能开销大的编译使用worker pool（thred-loader），但需要考虑IPC开销是否值得
10. cache：使用持久缓存 [相关阅读](https://yarnpkg.com/features/pnp),为webpack配置缓存
11. 检查自定义的loaders/plugins
12. 考虑移除进度插件

用于开发：

13. 使用webpack 的 watch 模式，内置的监视模式将跟踪时间戳，并传递给编译，使缓存无效。轮询模式可以修改`watchOptions.poll` 的间隔来改善CPU占用
14. 在内存中编译和使用文件，可通过 `webpack-dev-server`、`webpack-hot-middleware`、`webpack-dev-middleware`
15. 尽量不检索stats对象，webpack-dev-server 曾为此做过优化
16. devtool: 不同选项对性能的影响，官方推荐`eval-cheap-module-source-map`
17. 在开发中避免使用生产专用的工具，如 `TerserPlugin`、`[fullhash]/[chunkhash]/[contenthash]`、`AggressiveSplittingPlugin`、`AggressiveMergingPlugin`、`ModuleConcatenationPlugin`
18. 最小化入口块，webpack只会发送修改了的chunk到文件系统，粒度更小的chunk更容易生成新的文件，eg：`optimization.runtimeChunk:true` 将运行时的代码单独提出来
19. 避免额外的优化：如optimization下的 `removeAvailableModules`,`removeEmptyChunks`,`splitChunks`
20. 关闭 `output.pathinfo` ,在包中输出路径信息需要保持引用，影响内存回收
21. Node.js 版本是8.9.10-9.11.1 这期间Set和Map的性能有下降
22. typescript: 将ts的编译和类型检查拆分，对ts-laoder 设置 `transpileOnly`为true，再通过 `ForkTsCheckerWebpackPlugin`将类型检查放到单独的进程中，可以加快检查的速度和ESLint的插入速度[例子](https://github.com/TypeStrong/ts-loader/tree/master/examples/fork-ts-checker-webpack-plugin)

生产构建：

注意：**不要为了提高构建性能而牺牲代码质量**

23. 多重编译：`parallel-webpack` 、`chache-loader`
24. 关闭Source Map
25. 特定工具可能存在特定的问题，详见：https://webpack.js.org/guides/build-performance/ 最下方



## 推荐使用的 一些包



svg 压缩 mini-svg-data-uri https://www.npmjs.com/package/mini-svg-data-uri

html 自动生成 html-webpack-plugin

清理编译文件夹 clean-webpack-plugin 

Css https://webpack.js.org/plugins/mini-css-extract-plugin/



## 相关阅读

https://webpack.js.org/guides/code-splitting/

https://webpack.js.org/concepts/manifest/

https://webpack.js.org/guides/caching/

