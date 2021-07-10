const path = require('path');
const base = require('./wbepack.config')
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueServerRender = require('vue-server-renderer/client-plugin')

module.exports = merge(base,{
    entry:{
        client:path.resolve(__dirname,'../src/client-entry.js')//webpack打包的入口
    },
    plugin:[
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, '../public/client.html'),
                filename:'client.html',
            }
        ),
        new VueServerRender()

    ]
})