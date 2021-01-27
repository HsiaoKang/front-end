// 文件监控 server
// 手动建立并监听一个服务，使用 webpack-dev-middleware

const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.dev')
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    })
)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n')
})
