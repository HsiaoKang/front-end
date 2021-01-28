const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    
    // 使用Node.js 自行配合 devServer 时 此处的配置需要移到实例化devServer 的地方
    devServer: {
        contentBase: './dist',
        // 在 CLI 可以使用此命令启用： webpack serve --hot=only
        hot: true,
        writeToDisk:true
    },
})
