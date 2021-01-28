const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

const config = {
    entry: {
        // 动态导入
        index: './src/index.ts',
        // index: {
        //     import:'./src/index.js',
        //     dependOn:'shared'
        // },

        // math:'./src/math.js',

        // 在此入口配置了将会单独打包为一个 chunk
        // print: './src/print.js',
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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: require.resolve('./src/getComponent.js'),
            //     use: [
            //         {
            //             loader:'imports-loader',
            //             options:{
            //                 wrapper:'window'
            //             }
            //         },
            //     ],
            // },

            {
                test: require.resolve('./src/getComponent.js'),
                use: 'exports-loader?exports=default|getComponent',
            },
            {
                test: require.resolve('./src/globals.js'),
                // 指定文件导出type 和导出的内容
                use: 'exports-loader?type=commonjs&exports=helpers,file',
            },
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
    resolve: {
        extensions: ['.tsx', '.ts', 'js'],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new HtmlWebpackPlugin({
            title: 'Production',
        }),
        new webpack.ProvidePlugin({
            // tree shaking 多余的代码
            join: ['lodash', 'join'],
        }),
    ],
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        // 其他资源输出路径
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
        // 此项优化在开发模式中似乎没有影响
        runtimeChunk: 'multiple',
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

// server2
// 使用Node.js 自行配合devServer时 config 必须为一个对象，不能是函数
module.exports = config

// module.exports = (env) => {
//     console.log('env', env)
//     console.log(process.env.NODE_ENV)
//     return  config
// }
