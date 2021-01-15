const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
    entry: {
        index: './src/index.js',
        print: './src/print.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // 生成独立的文件
                type: 'asset/resource',
                generator: {
                    // 优先级高于 assetModuleFilename
                    filename: 'images/[hash][ext][query]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            // 自定义的 解析器
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },
            {
                test: /\.txt$/i,
                // 编译为源码
                type: 'asset/source',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'static/[hash][ext][query]',
    },
}
