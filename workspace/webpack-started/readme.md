# webpack 基本示例



版本: 5.11.1



webpack 通过分析模块的导入依赖，构建出依赖关系图，再用这个图来生成优化的包，并保证包内容的正确执行顺序



webpack 本身除了 `import`	和 `export` 不会改动其他代码，所有需要其他特性的支持就需要用到



如果webpack.config.js 存在，默认就会使用