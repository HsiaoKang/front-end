// 这里存放了一些全局变量，但是并没有通过模块导出
// 而是使用exports-loader 来导出

const file = 'blah.txt'

const helpers = {
    test: function () {
        console.log('test something')
    },
    parse: function () {
        console.log('parse something')
    },
}
