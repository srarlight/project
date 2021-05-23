const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./wbepack.config')
const merge = require('webpack-merge');
module.exports = merge(base,{
    entry:{
        client:path.resolve(__dirname,'../src/client-entry.js')
    },
    plugin:[
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, '../public/client.html'),
                filename:'client.html',
            }
        )

    ]
})