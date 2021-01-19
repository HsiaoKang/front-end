const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

module.exports = {
    mode: 'development',
    entry: {
        // 动态导入
        index: './src/index.js',
        // 使用 dependOn 方式
        // basic: {
        //     import: './src/basic.js',
        //     dependOn: 'shared',
        // },
        // print: {
        //     import: './src/print.js',
        //     dependOn: 'shared',
        // },
        // shared: 'lodash',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
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
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HtmlWebpackPlugin({
            title: 'Caching',
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'static/[hash][ext][query]',
        // 输出文件名hash长度统一配置为 8
        hashDigestLength: 8,
        // webpack-dev-middleware 需要正确的路径
        // 该选项指定在浏览器中引用时输出目录的公共URL。
        // 相对URL相对于HTML页面（或标记）进行解析。
        // 相对于服务器的URL，
        // 相对于协议的URL或绝对URL也是可能的，有时甚至是必需的。 e。在CDN上托管资产时。
        publicPath: '/',
    },

    // 官方建议在做代码拆分(entery depencies)时加上下面内容，但不加暂时没有发现问题。
    optimization: {
        runtimeChunk: 'single',
        // 将node_modules 中的包集中打一个包缓存
        // splitChunks: {
        //     cacheGroups: {
        //         vendor: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: 'vendors',
        //             chunks: 'all',
        //         },
        //     },
        // },
    },

    // 使用 SplitChunksPlugin
    // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
}
