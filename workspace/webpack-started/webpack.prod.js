const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
    // 指定 mode后，webpack将会设置 process.env.NODE_ENV 为 'production'
    mode: 'production',
})
