const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const base = require('./wbepack.config')
const merge = require('webpack-merge');
module.exports =merge(base,{
    entry:path.resolve(__dirname,'../src/server-entry.js'),
    target: 'node',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[name].bundle.js',
        libraryTarget:'commonjs2' // 使用commonjs 规范 module.exports
    },
    plugins: [
        new VueLoaderPlugin(),//
        new HtmlWebpackPlugin({
            filename: 'server.html',
            template: path.resolve(__dirname, '../public/server.html'),
            excludeChunks: ['server']//排除引入server入口打包出来的结果，因为服务端渲染不要引入服务端打包后的结果
        })
    ]

})