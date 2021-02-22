const gulp = require('gulp'),
    gulpConnect = require('gulp-connect'),
    path = require('path'),
    livereload = require('gulp-livereload')
const { series ,parallel} = require('gulp')

const DEV_PATH = path.resolve(__dirname, './src')

function connect() {
    gulpConnect.server({
        root: DEV_PATH,
        port: 8080,
        // TODO: 实时加载不能工作
        livereload: true,
        // middleware: function(connect, opt) { //设置代理
        //     return [
        //         proxy('/index', {
        //             target: 'http://youwebsite.com',
        //             changeOrigin: true
        //         })
        //     ]
        // }
    })
}

function html (){
    return gulp.src('src/index.html').pipe(connect.reload())
}
function watch() {
    // livereload.listen({
    //     port:8080,
    //     host:'127.0.0.1',
    //     basePath:'src/*',
    //     start:true
    // })
    gulp.watch('src/*')
}
exports.default = series(connect,watch)

