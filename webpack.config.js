const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
 

module.exports = {
    // 入口文件
    entry: './src/app.jsx',
    output: {
        // 最后打包的文件放哪
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    module: {
        rules: [
        // react语法的处理
        {
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            }
        },
        // css文件的处理
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        // sass 文件的处理
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        },
        // 图片的配置,小于指定大小会返回DataUrl
        {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name:'resource/[name].[ext]'
                }
            }]
        },
        // 字体图标的配置
        {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'resource/[name].[ext]'
                }
            }]
        }
    ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port:8086
    }
}