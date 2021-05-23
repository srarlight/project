const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry:path.resolve(__dirname,'src/app.js'),
    output:{
        filename:'[name].bundle.js',

    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        preset:['@babel/preset-env'],
                    }
                },
                exclude: /node_modules/,
                include:path.resolve(__dirname,'src')
            },
            {
                test:/\.css$/,
                use: ['vue-style-loader',{
                        loader:'css-loader',
                        options:{
                            esModule:false
                        }

                }],
                exclude:/node_modules/
            },

        ]
    },
    plugin:[
        new HtmlWebpackPlugin(
            {
                template:'index.html'
            }
        ),
        new VueLoaderPlugin()
    ]
}