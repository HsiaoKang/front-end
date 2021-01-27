
// webpack-dev-server 内部使用 webpack-dev-middleware，文件在内存中
const webpackDevServer = require('webpack-dev-server')
const webpack  = require('webpack')

const config = require('./webpack.dev')

// webpack.config 的 devServer 配置移动到这里
const options  = {
    contentBase:'./dist',
    hot:true,
    host:'localhost'
}

webpackDevServer.addDevServerEntrypoints(config,options)

const compiler = webpack(config)
const server = new webpackDevServer(compiler,options)

server.listen(5000,'localhost',()=>{
    console.log('dev server listening on port 5000')
})